import React from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

import {
  AttachmentActionsProps,
  AttachmentActions as DefaultAttachmentActions,
} from './AttachmentActions';
import { AudioProps, Audio as DefaultAudio } from './Audio';
import { CardProps, Card as DefaultCard } from './Card';
import {
  FileAttachment as DefaultFile,
  FileAttachmentProps,
} from './FileAttachment';

import {
  Gallery as DefaultGallery,
  ImageComponent as DefaultImage,
  GalleryProps,
  ImageProps,
} from '../Gallery';

import type { Attachment as StreamAttachment } from 'stream-chat';

import type { ActionHandlerReturnType } from '../Message';

import type { DefaultAttachmentType } from '../../../types/types';

export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/ogg',
  'video/webm',
  'video/quicktime',
];

export type AttachmentProps<
  At extends DefaultAttachmentType = DefaultAttachmentType
> = {
  /**
   * The attachment to render
   * See [Attachment structure](https://getstream.io/chat/docs/#message_format)
   **/
  attachments: ExtendedAttachment<At>[];
  /**
		The handler function to call when an action is selected on an attachment.
		Examples include canceling a \/giphy command or shuffling the results.
		*/
  actionHandler?: ActionHandlerReturnType;
  /**
   * Custom UI component for attachment actions
   * Defaults to [AttachmentActions](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Attachment/AttachmentActions.tsx)
   */
  AttachmentActions?: React.ComponentType<AttachmentActionsProps>;
  /**
   * Custom UI component for audio type attachment
   * Defaults to [Audio](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Attachment/Audio.tsx)
   */
  Audio?: React.ComponentType<AudioProps>;
  /**
   * Custom UI component for card type attachment
   * Defaults to [Card](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Attachment/Card.tsx)
   */
  Card?: React.ComponentType<CardProps>;
  /**
   * Custom UI component for file type attachment
   * Defaults to [File](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Attachment/FileAttachment.tsx)
   */
  File?: React.ComponentType<FileAttachmentProps>;
  /**
   * Custom UI component for gallery type attachment
   * Defaults to [AttachmentActions](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Gallery/Gallery.tsx)
   */
  Gallery?: React.ComponentType<GalleryProps>;
  /**
   * Custom UI component for image type attachment
   * Defaults to [Image](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Gallery/Image.tsx)
   */
  Image?: React.ComponentType<ImageProps>;
  /**
   * Custom UI component for media type attachment
   * Defaults to ReactPlayer from 'react-player'
   */
  Media?: React.ComponentType<ReactPlayerProps>;
};

export type BaseAttachmentUIComponentProps = {
  /**
   * The handler function to call when an action is selected on an attachment.
   * Examples include canceling a \/giphy command or shuffling the results.
   */
  actionHandler?: ActionHandlerReturnType;
  AttachmentActions?: React.ComponentType<AttachmentActionsProps>;
  Audio?: React.ComponentType<AudioProps>;
  Card?: React.ComponentType<CardProps>;
  File?: React.ComponentType<FileAttachmentProps>;
  Gallery?: React.ComponentType<GalleryProps>;
  Image?: React.ComponentType<ImageProps>;
  Media?: React.ComponentType<ReactPlayerProps>;
};

export type DefaultAttachmentProps = Required<
  Pick<
    InnerAttachmentUIComponentProps,
    | 'AttachmentActions'
    | 'Audio'
    | 'Card'
    | 'File'
    | 'Gallery'
    | 'Image'
    | 'Media'
  >
> & {
  attachment: ExtendedAttachment;
  componentType: string;
};

export type ExtendedAttachment<
  At extends DefaultAttachmentType = DefaultAttachmentType
> = StreamAttachment<At> & {
  asset_url?: string;
  id?: string;
  images?: Array<{
    image_url?: string;
    thumb_url?: string;
  }>;
  mime_type?: string;
};

export type InnerAttachmentUIComponentProps<
  At extends DefaultAttachmentType = DefaultAttachmentType
> = BaseAttachmentUIComponentProps & {
  attachment: ExtendedAttachment<At>;
};

export type WrapperAttachmentUIComponentProps<
  At extends DefaultAttachmentType = DefaultAttachmentType
> = BaseAttachmentUIComponentProps & {
  attachments: ExtendedAttachment<At>[];
};

/**
 * Attachment - The message attachment
 *
 * @example ./Attachment.md
 */
export const Attachment = <
  At extends DefaultAttachmentType = DefaultAttachmentType
>(
  props: WrapperAttachmentUIComponentProps<At>,
) => {
  const {
    AttachmentActions = DefaultAttachmentActions,
    attachments,
    Audio = DefaultAudio,
    Card = DefaultCard,
    File = DefaultFile,
    Gallery = DefaultGallery,
    Image = DefaultImage,
    Media = ReactPlayer,
    ...rest
  } = props;

  const gallery = {
    images: attachments?.filter(
      (attachment) =>
        attachment.type === 'image' &&
        !(attachment.og_scrape_url || attachment.title_link),
    ),
    type: 'gallery',
  };

  let newAttachments;

  if (gallery.images?.length >= 2) {
    newAttachments = [
      ...attachments.filter(
        (attachment) =>
          !(
            attachment.type === 'image' &&
            !(attachment.og_scrape_url || attachment.title_link)
          ),
      ),
      gallery,
    ];
  } else {
    newAttachments = attachments;
  }

  const propsWithDefault = {
    AttachmentActions,
    Audio,
    Card,
    File,
    Gallery,
    Image,
    Media,
    ...rest,
  };

  return (
    <>
      {newAttachments?.map((attachment) => {
        if (isGalleryAttachment(attachment)) {
          return renderGallery({
            ...propsWithDefault,
            attachment,
          });
        }

        if (isImageAttachment(attachment)) {
          return renderImage({
            ...propsWithDefault,
            attachment,
          });
        }

        if (isFileAttachment(attachment)) {
          return renderFile({
            ...propsWithDefault,
            attachment,
          });
        }

        if (isAudioAttachment(attachment)) {
          return renderAudio({
            ...propsWithDefault,
            attachment,
          });
        }

        if (isMediaAttachment(attachment)) {
          return renderMedia({
            ...propsWithDefault,
            attachment,
          });
        }

        return renderCard({
          ...propsWithDefault,
          attachment,
        });
      })}
    </>
  );
};

export const isGalleryAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'gallery';

export const isImageAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'image' &&
  !attachment.title_link &&
  !attachment.og_scrape_url;

export const isMediaAttachment = (attachment: ExtendedAttachment) =>
  (attachment.mime_type &&
    SUPPORTED_VIDEO_FORMATS.indexOf(attachment.mime_type) !== -1) ||
  attachment.type === 'video';

export const isAudioAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'audio';

export const isFileAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'file' ||
  (attachment.mime_type &&
    SUPPORTED_VIDEO_FORMATS.indexOf(attachment.mime_type) === -1 &&
    attachment.type !== 'video');

export const renderAttachmentWithinContainer: React.FC<
  Partial<DefaultAttachmentProps>
> = (props) => {
  const { attachment, children, componentType } = props;

  const extra =
    componentType === 'card' && !attachment?.image_url && !attachment?.thumb_url
      ? 'no-image'
      : attachment && attachment.actions && attachment.actions.length
      ? 'actions'
      : '';

  return (
    <div
      className={`str-chat__message-attachment str-chat__message-attachment--${componentType} str-chat__message-attachment--${
        attachment?.type || ''
      } str-chat__message-attachment--${componentType}--${extra}`}
      key={`${attachment?.id}-${attachment?.type || 'none'} `}
    >
      {children}
    </div>
  );
};

export const renderAttachmentActions: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { actionHandler, attachment, AttachmentActions } = props;

  if (!AttachmentActions || !attachment.actions || !attachment.actions.length) {
    return null;
  }

  return (
    <AttachmentActions
      {...attachment}
      actionHandler={() => actionHandler}
      actions={attachment.actions || []}
      id={attachment.id || ''}
      key={`key-actions-${attachment.id}`}
      text={attachment.text || ''}
    />
  );
};

export const renderGallery: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Gallery } = props;

  if (!Gallery) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: <Gallery images={attachment.images || []} key='gallery' />,
    componentType: 'gallery',
  });
};

export const renderImage: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Image } = props;

  if (!Image) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment'
          key={`key-image-${attachment.id}`}
        >
          {<Image {...attachment} />}
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'image',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: <Image {...attachment} key={`key-image-${attachment.id}`} />,
    componentType: 'image',
  });
};

export const renderCard: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, Card } = props;

  if (!Card) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment'
          key={`key-image-${attachment.id}`}
        >
          <Card {...attachment} key={`key-card-${attachment.id}`} />
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'card',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: <Card {...attachment} key={`key-card-${attachment.id}`} />,
    componentType: 'card',
  });
};

export const renderFile: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, File } = props;

  if (!File || !attachment.asset_url) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <File attachment={attachment} key={`key-file-${attachment.id}`} />
    ),
    componentType: 'file',
  });
};

export const renderAudio: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, Audio } = props;
  if (!Audio) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <div className='str-chat__attachment' key={`key-video-${attachment.id}`}>
        <Audio og={attachment} />
      </div>
    ),
    componentType: 'audio',
  });
};

export const renderMedia: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Media } = props;

  if (!Media) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment str-chat__attachment-media'
          key={`key-video-${attachment.id}`}
        >
          <div className='str-chat__player-wrapper'>
            <Media
              className='react-player'
              controls
              height='100%'
              url={attachment.asset_url}
              width='100%'
            />
          </div>
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'media',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <div
        className='str-chat__player-wrapper'
        key={`key-video-${attachment.id}`}
      >
        {' '}
        <Media
          className='react-player'
          controls
          height='100%'
          url={attachment.asset_url}
          width='100%'
        />
      </div>
    ),
    componentType: 'media',
  });
};
