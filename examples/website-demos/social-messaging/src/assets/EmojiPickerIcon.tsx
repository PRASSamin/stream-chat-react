type Props = {
  cooldownRemaining?: number;
};

export const EmojiPickerIcon: React.FC<Props> = (props) => {
  const { cooldownRemaining } = props;
  const fill = cooldownRemaining ? 'var(--disabled)' : 'var(--text-low-emphasis)';
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM8.5607 8.5607C8.842 8.2794 9 7.89782 9 7.5C9 7.10218 8.842 6.72064 8.5607 6.43934C8.2794 6.15804 7.89787 6 7.50004 6C7.10222 6 6.72069 6.15804 6.43938 6.43934C6.15808 6.72064 6.00004 7.10218 6.00004 7.5C6.00004 7.89782 6.15808 8.2794 6.43938 8.5607C6.72069 8.842 7.10222 9 7.50004 9C7.89787 9 8.2794 8.842 8.5607 8.5607ZM13.5607 8.5607C13.842 8.2794 14 7.89782 14 7.5C14 7.10218 13.842 6.72064 13.5607 6.43934C13.2794 6.15804 12.8979 6 12.5 6C12.1022 6 11.7207 6.15804 11.4394 6.43934C11.1581 6.72064 11 7.10218 11 7.5C11 7.89782 11.1581 8.2794 11.4394 8.5607C11.7207 8.842 12.1022 9 12.5 9C12.8979 9 13.2794 8.842 13.5607 8.5607ZM5.78345 11.023C5.65516 11.0514 5.53371 11.1047 5.42604 11.18C5.31848 11.2554 5.22681 11.3522 5.15629 11.463C5.08576 11.5738 5.03775 11.6974 5.01499 11.8268C4.99224 11.9561 4.9952 12.0887 5.02369 12.2169C5.05218 12.3451 5.10565 12.4665 5.18104 12.574C5.85804 13.541 7.15404 14.744 8.884 15.104C10.708 15.483 12.759 14.874 14.743 12.669C14.834 12.5719 14.9046 12.4577 14.9509 12.3331C14.9971 12.2084 15.018 12.0757 15.0124 11.9429C15.0067 11.81 14.9746 11.6796 14.918 11.5593C14.8613 11.439 14.7812 11.3312 14.6824 11.2422C14.5836 11.1532 14.468 11.0848 14.3424 11.041C14.2168 10.9973 14.0838 10.979 13.9511 10.9873C13.8183 10.9955 13.6886 11.0302 13.5694 11.0892C13.4503 11.1482 13.3441 11.2304 13.257 11.331C11.641 13.126 10.275 13.35 9.291 13.146C8.212 12.922 7.30904 12.125 6.81904 11.427C6.74383 11.3193 6.64812 11.2274 6.53739 11.1567C6.42667 11.086 6.30309 11.0378 6.17373 11.0149C6.04436 10.9919 5.91174 10.9947 5.78345 11.023Z'
        fill={fill}
      />
    </svg>
  );
};
