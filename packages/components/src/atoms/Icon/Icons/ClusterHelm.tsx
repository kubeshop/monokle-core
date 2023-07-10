const ClusterHelm = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '19';
  const iconHeight = height || '19';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4933 4.00234L6.33166 7.00061L1.16797 3.99756"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.32812 7V12.5724" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.94493 12.8341C6.56412 13.0553 6.09494 13.0553 5.71413 12.8341L1.6154 10.4533C1.23458 10.2321 1 9.82324 1 9.38085V4.61916C1 4.17676 1.23458 3.76796 1.6154 3.54675L5.71413 1.1659C6.09494 0.944698 6.56412 0.944698 6.94493 1.1659L11.0437 3.54675C11.4245 3.76796 11.6591 4.17676 11.6591 4.61916V6.625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3437 10.607L11.3572 10.6189L11.2338 10.7362C11.1443 10.8207 11.0564 10.9068 10.9703 10.9945C10.805 11.1644 10.6581 11.3549 10.6439 11.4092H11.4075C11.4249 11.41 11.4422 11.4068 11.4581 11.4C11.474 11.3932 11.488 11.383 11.499 11.3701C12.1025 10.7394 12.9414 10.3578 13.8368 10.3063C14.355 10.275 14.8741 10.3543 15.3558 10.5387C15.8375 10.7231 16.2695 11.0077 16.6202 11.3717C16.6287 11.383 16.6399 11.3924 16.6529 11.3989C16.6658 11.4054 16.6802 11.4089 16.6949 11.4092L17.1942 11.4084H17.4417C17.4551 11.4069 17.4682 11.4045 17.4812 11.4012C17.3012 11.1496 17.0915 10.9184 16.856 10.7122L16.8669 10.7019C17.1088 10.52 17.3136 10.2976 17.4711 10.0456C17.5844 9.87574 17.67 9.68995 17.7228 9.49538C17.7431 9.4199 17.7494 9.34164 17.7413 9.26412C17.7304 9.15886 17.6691 9.07037 17.5214 9.08711C17.492 9.0902 17.463 9.09635 17.435 9.10546C17.3336 9.14034 17.2398 9.1925 17.1581 9.25935C16.8066 9.53565 16.5395 9.89633 16.3844 10.3039L16.3727 10.3279L16.3676 10.3367C16.3223 10.3127 16.277 10.2872 16.2333 10.2625C16.131 10.2067 16.032 10.1508 15.9279 10.1014C15.7769 10.0296 15.6225 9.96584 15.4639 9.91004C15.1966 9.81914 14.9206 9.75318 14.6399 9.71307C14.5886 9.70511 14.5375 9.69712 14.4863 9.68755C14.5957 9.30166 14.6066 8.89652 14.5182 8.50581C14.4942 8.39164 14.4526 8.28149 14.3948 8.17886C14.364 8.11784 14.3168 8.06559 14.258 8.02736C14.2302 8.00927 14.1971 7.99973 14.1634 8.00001C14.1296 8.00031 14.0968 8.01039 14.0692 8.02894C14.0414 8.04688 14.0163 8.06834 13.9945 8.09274C13.9374 8.16002 13.8938 8.23683 13.8662 8.3192C13.8091 8.47628 13.7739 8.63977 13.7613 8.80563C13.7327 9.09252 13.7562 9.38194 13.8309 9.66125L13.8343 9.67959C13.1618 9.71488 12.5086 9.90537 11.9311 10.2346L11.9235 10.229C11.9213 10.2275 11.9193 10.2256 11.9177 10.2234C11.7948 9.94025 11.6185 9.68079 11.3974 9.4579C11.2806 9.32932 11.1402 9.22204 10.9829 9.14133C10.9402 9.12013 10.8952 9.10354 10.8486 9.09188C10.7001 9.05761 10.5986 9.13097 10.5885 9.2753L10.5876 9.29365V9.3064C10.5818 9.41804 10.6111 9.5233 10.6498 9.62695C10.789 9.99695 11.0181 10.3095 11.3143 10.5807L11.3437 10.607ZM16.856 16.2885C17.0649 16.1051 17.2537 15.9018 17.4182 15.6825L17.4149 15.6689H17.1682C17.0003 15.6689 16.8325 15.6697 16.6647 15.6673C16.6384 15.6662 16.6122 15.6706 16.5878 15.6801C16.5635 15.6896 16.5416 15.704 16.5237 15.7223C15.7265 16.4623 14.7733 16.7813 13.6665 16.6792C13.2588 16.6393 12.8627 16.5274 12.4984 16.3491C12.1541 16.1847 11.8413 15.9666 11.5728 15.704C11.5621 15.6922 11.5486 15.6828 11.5335 15.6766C11.5184 15.6703 11.502 15.6675 11.4855 15.6681L10.9686 15.6689H10.7446C10.7266 15.6688 10.7086 15.6702 10.6909 15.6729C10.8839 15.9305 11.1079 16.1649 11.3597 16.3722C11.3574 16.3773 11.3545 16.3821 11.3513 16.3866L11.3303 16.4049L11.3185 16.4161C11.052 16.6532 10.84 16.9401 10.6959 17.259C10.6471 17.3604 10.6129 17.4677 10.5944 17.5779C10.5776 17.6561 10.5834 17.7371 10.6111 17.8123C10.6213 17.8378 10.6383 17.8604 10.6603 17.8779C10.6824 17.8953 10.7088 17.9071 10.737 17.912C10.789 17.92 10.8419 17.9152 10.8906 17.8961C10.994 17.8614 11.0898 17.8089 11.1734 17.7414C11.4889 17.4918 11.7381 17.1752 11.8992 16.8164L11.916 16.7813L11.9252 16.7622C12.5021 17.0926 13.1551 17.2842 13.8276 17.3204L13.8301 17.3283C13.8318 17.3323 13.8326 17.3347 13.8318 17.3363C13.7882 17.4878 13.7626 17.6435 13.7554 17.8004C13.742 17.9982 13.7529 18.1967 13.7873 18.3913C13.8141 18.5348 13.8511 18.6752 13.9232 18.8035C13.9484 18.849 13.9794 18.8913 14.0155 18.9295C14.1062 19.0236 14.2178 19.0228 14.3117 18.9311C14.3332 18.9114 14.3515 18.8888 14.3663 18.8641C14.4032 18.8011 14.4359 18.7366 14.4645 18.6696C14.5232 18.5077 14.5584 18.3386 14.5685 18.1672C14.5949 17.8836 14.5687 17.5978 14.4913 17.3228L14.4879 17.3052C14.7128 17.2813 14.9352 17.2414 15.1534 17.1856C15.3674 17.1282 15.5772 17.0556 15.7802 16.9679C15.9839 16.8776 16.1802 16.7731 16.3676 16.6553L16.3752 16.6729L16.3844 16.6968C16.5388 17.1051 16.8065 17.4655 17.1589 17.7398C17.2261 17.7908 17.2974 17.8339 17.3746 17.8698C17.4249 17.8929 17.4778 17.908 17.534 17.9144C17.5748 17.9212 17.6167 17.9136 17.6519 17.893C17.6872 17.8725 17.7133 17.8404 17.7253 17.8028C17.7346 17.7759 17.7402 17.7481 17.7421 17.7198C17.7492 17.6105 17.7318 17.501 17.6909 17.3985C17.5365 16.9778 17.2626 16.6057 16.8996 16.3236L16.856 16.2885ZM16.3894 12.3294L16.4499 12.3302C16.4943 12.331 16.538 12.3326 16.5808 12.3286C16.6513 12.3222 16.7016 12.3461 16.7528 12.3916C16.976 12.5869 17.2009 12.7807 17.4258 12.9737L17.6473 13.165C17.6565 13.173 17.6675 13.181 17.6784 13.1914L17.6968 13.2065L17.7136 13.1922L17.7472 13.1643L18.6702 12.3653C18.6829 12.3528 18.6982 12.3431 18.7151 12.3368C18.7321 12.3305 18.7502 12.3277 18.7684 12.3286C18.8455 12.3314 18.9228 12.3317 19 12.3294V14.6817C18.7837 14.694 18.5668 14.6945 18.3505 14.6833V13.492L18.3379 13.4864L17.6977 14.0414L17.0523 13.4888L17.0398 13.4928V14.6881H16.3953C16.3836 14.6482 16.3785 12.4633 16.3903 12.3294H16.3894ZM11.0836 12.3318H10.4433V13.1659C10.1777 13.1773 9.91166 13.1763 9.64615 13.1627V12.3334H9V14.6833C9.0537 14.6953 9.60082 14.6945 9.6495 14.6801V13.7934H10.4433V14.3859C10.4433 14.4864 10.4425 14.5876 10.445 14.6889H11.0861C11.0995 14.6315 11.097 12.3708 11.0836 12.3318ZM11.8514 14.6873V12.3397C11.8892 12.3286 13.2972 12.3238 13.3895 12.3357V12.8357L13.3769 12.8373H13.3702C13.3557 12.8387 13.3412 12.8396 13.3266 12.8397H12.5042V13.2297H13.288V13.748H12.5109C12.4969 13.8938 12.4949 14.0404 12.5051 14.1865L12.5244 14.1873C12.5387 14.1889 12.5529 14.1897 12.568 14.1897H13.3895V14.6881L11.8514 14.6873ZM14.1263 12.3318C14.1145 12.3756 14.112 14.6251 14.1238 14.6881H15.6611V14.0725H14.8345L14.79 14.0701L14.7649 14.0685V12.3326L14.1263 12.3318Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ClusterHelm;