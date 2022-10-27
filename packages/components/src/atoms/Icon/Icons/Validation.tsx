const Validation = ({ width, height }: { width?: number; height?: number }) => {
  const iconWidth = width || "18";
  const iconHeight = height || "19";

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.24178 12.9113C9.26248 12.9107 9.28319 12.9126 9.30346 12.9169L9.30622 12.9132L10.9025 13.1829C10.6669 13.8452 10.2173 14.4101 9.62474 14.7884L9.00519 13.2915L9.00703 13.2897C8.98974 13.2496 8.98242 13.2059 8.98568 13.1624C8.98894 13.1188 9.00268 13.0767 9.02575 13.0396C9.04881 13.0025 9.0805 12.9716 9.11812 12.9494C9.15574 12.9272 9.19817 12.9145 9.24178 12.9123V12.9113ZM6.72677 12.9785C6.77248 13.0156 6.80484 13.0666 6.81896 13.1238C6.83308 13.1809 6.82819 13.2411 6.80502 13.2952L6.80962 13.3007L6.19652 14.7829C5.60772 14.4059 5.15985 13.8451 4.92244 13.1875L6.50583 12.9187L6.50767 12.9224C6.54601 12.9149 6.58552 12.9159 6.6234 12.9255C6.66128 12.935 6.69657 12.9528 6.72677 12.9776V12.9785ZM8.04595 13.6054C8.0879 13.6305 8.12226 13.6664 8.14537 13.7095H8.1509L8.93154 15.1198C8.26936 15.3444 7.55149 15.3438 6.88971 15.1179L7.6676 13.7104H7.66944C7.6866 13.6781 7.71014 13.6497 7.73863 13.6268C7.76712 13.6039 7.79997 13.587 7.83519 13.5772C7.8704 13.5674 7.90724 13.5648 7.94347 13.5697C7.9797 13.5745 8.01457 13.5867 8.04595 13.6054ZM9.41116 11.5121L10.6079 10.4414C10.9761 11.037 11.1372 11.7376 11.07 12.4336L9.51979 11.9871L9.51795 11.9806C9.471 11.9675 9.42846 11.942 9.39483 11.9067C9.3612 11.8714 9.33773 11.8277 9.32688 11.7802C9.31604 11.7326 9.31823 11.6831 9.33323 11.6367C9.34822 11.5903 9.37547 11.5488 9.41208 11.5167V11.5121H9.41116ZM8.42891 10.6983C8.40206 10.6574 8.38678 10.61 8.38472 10.5611H8.38288L8.29174 8.95563C8.98431 9.04137 9.62955 9.35218 10.1283 9.8403L8.81923 10.7701L8.81463 10.7673C8.7851 10.7888 8.75153 10.8041 8.71593 10.8123C8.68033 10.8205 8.64345 10.8214 8.60749 10.8149C8.57154 10.8085 8.53726 10.7948 8.50673 10.7748C8.4762 10.7547 8.45004 10.7287 8.42983 10.6983H8.42891ZM7.13182 10.8244C7.08328 10.8199 7.03684 10.8024 6.99742 10.7738L6.99466 10.7747L5.67547 9.8403C6.17615 9.3481 6.8266 9.0368 7.52399 8.95563L7.43193 10.5629L7.42548 10.5666C7.42388 10.6031 7.41492 10.6389 7.39913 10.6718C7.38335 10.7047 7.36107 10.7341 7.33364 10.7582C7.3062 10.7822 7.27418 10.8005 7.2395 10.8119C7.20482 10.8233 7.16819 10.8275 7.13182 10.8244ZM6.41838 11.9153C6.38439 11.9506 6.34143 11.9761 6.2941 11.9889L6.29318 11.9935L4.74938 12.4391C4.67273 11.7419 4.83047 11.039 5.1977 10.4414L6.40181 11.5185L6.39997 11.524C6.42773 11.548 6.45034 11.5773 6.46639 11.6102C6.48244 11.6432 6.49161 11.6791 6.49333 11.7157C6.49506 11.7523 6.4893 11.7889 6.47641 11.8232C6.46352 11.8575 6.44378 11.8888 6.41838 11.9153ZM7.90787 12.6747L7.46323 12.4612L7.35276 11.9834L7.66023 11.6004H8.15366L8.46021 11.9843L8.34974 12.4621L7.90787 12.6747Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9833 7.9071L15.2491 13.4029C15.29 13.5852 15.2772 13.7755 15.2122 13.9507C15.1767 14.0499 15.1251 14.1426 15.0594 14.225L11.5152 18.6336C11.4228 18.7474 11.3057 18.8387 11.1728 18.9006C11.1488 18.9126 11.123 18.9227 11.0973 18.9328C10.9864 18.975 10.8689 18.9972 10.7502 18.9982L5.06567 19C4.93161 18.9983 4.79922 18.97 4.67625 18.9165C4.55327 18.8631 4.44218 18.7857 4.34947 18.6889L4.34302 18.6824C4.32829 18.6668 4.31356 18.6511 4.29976 18.6336L0.755546 14.2278C0.690174 14.1443 0.638298 14.0511 0.60181 13.9516C0.538387 13.7767 0.525937 13.5874 0.565908 13.4057L1.82986 7.90894C1.86381 7.76675 1.92891 7.63387 2.02045 7.51989C2.11198 7.4059 2.22768 7.31366 2.35919 7.24981L7.48126 4.802C7.61395 4.73872 7.7591 4.70587 7.9061 4.70587C8.05311 4.70587 8.19826 4.73872 8.33095 4.802L13.453 7.24797C13.5847 7.31176 13.7005 7.40398 13.7922 7.51796C13.8839 7.63194 13.9492 7.76485 13.9833 7.9071ZM9.98706 15.6648C9.96723 15.6248 9.95001 15.5836 9.93551 15.5414C10.7774 15.0422 11.4065 14.251 11.703 13.3182L11.8337 13.3412C11.8802 13.2982 11.9417 13.2751 12.005 13.2768C12.1891 13.3127 12.3677 13.3652 12.5398 13.4351C12.63 13.4756 12.7212 13.5106 12.8151 13.541L12.8639 13.5521L12.8942 13.5576L12.9007 13.5594L12.9044 13.5603C12.9449 13.5732 12.9877 13.5776 13.03 13.5731C13.0723 13.5686 13.1132 13.5554 13.1501 13.5343C13.1871 13.5131 13.2192 13.4846 13.2446 13.4504C13.2699 13.4162 13.2879 13.3772 13.2973 13.3357C13.3068 13.2942 13.3075 13.2512 13.2995 13.2094C13.2915 13.1677 13.2749 13.128 13.2508 13.0929C13.2267 13.0579 13.1955 13.0283 13.1593 13.0059C13.1232 12.9835 13.0827 12.9688 13.0406 12.9629C13.0301 12.9605 13.0197 12.9581 13.0093 12.9555L12.9513 12.9417C12.8539 12.9285 12.7559 12.9208 12.6576 12.9187C12.472 12.9065 12.2879 12.8763 12.1081 12.8285C12.0523 12.7972 12.0064 12.7509 11.9755 12.695L11.8521 12.6591C11.9843 11.6922 11.757 10.7105 11.2133 9.90014C11.2492 9.86735 11.2854 9.83482 11.3219 9.80256C11.3179 9.73951 11.3387 9.6774 11.3799 9.62949C11.5207 9.50798 11.6745 9.40027 11.8356 9.30913C11.923 9.26402 12.0086 9.21431 12.0906 9.16C12.1136 9.14232 12.136 9.1239 12.1578 9.10476C12.1948 9.0818 12.2266 9.05125 12.2509 9.01512C12.2753 8.979 12.2917 8.93812 12.2991 8.89518C12.3066 8.85224 12.3048 8.80821 12.294 8.766C12.2831 8.72379 12.2635 8.68436 12.2363 8.6503C12.2091 8.61624 12.175 8.58833 12.1363 8.56841C12.0975 8.54848 12.055 8.537 12.0115 8.53471C11.9679 8.53242 11.9244 8.53937 11.8838 8.55512C11.8432 8.57087 11.8063 8.59505 11.7757 8.62607L11.7573 8.6408C11.7408 8.65368 11.7214 8.66841 11.7085 8.68038C11.6369 8.74787 11.5693 8.81949 11.506 8.89487C11.3799 9.03296 11.2418 9.15816 11.0917 9.26863C11.0331 9.29243 10.9691 9.29944 10.9067 9.28888L10.7898 9.37173C10.1185 8.66747 9.21433 8.23078 8.24533 8.14276L8.23797 8.00652C8.18543 7.97047 8.14909 7.91529 8.13671 7.85278C8.13063 7.66672 8.14265 7.4805 8.17261 7.29676C8.19194 7.2001 8.20575 7.10344 8.21403 7.00494V6.91748C8.21661 6.87522 8.21043 6.83287 8.19588 6.79311C8.18133 6.75334 8.15873 6.71701 8.12948 6.68639C8.10024 6.65577 8.06498 6.63152 8.02592 6.61516C7.98687 6.5988 7.94486 6.59069 7.90252 6.59132C7.86018 6.59196 7.81843 6.60133 7.77988 6.61886C7.74133 6.63638 7.70682 6.66168 7.67851 6.69316C7.6502 6.72465 7.62869 6.76164 7.61534 6.80183C7.60199 6.84201 7.59709 6.88452 7.60093 6.92669V7.00494C7.60922 7.10344 7.62303 7.2001 7.64236 7.29676C7.67182 7.48087 7.68286 7.66683 7.67642 7.85278C7.65902 7.91395 7.62453 7.96888 7.577 8.01112L7.56963 8.14092C6.59408 8.21928 5.68254 8.65766 5.01228 9.37081C4.97513 9.34487 4.93831 9.31848 4.90181 9.29164C4.84111 9.3099 4.77566 9.30362 4.71954 9.27415C4.56992 9.16332 4.43148 9.03814 4.3062 8.9004C4.24314 8.82541 4.17583 8.7541 4.10459 8.68682C4.0868 8.67171 4.06869 8.65698 4.05028 8.64264L4.03647 8.63251C3.97576 8.58338 3.90092 8.55499 3.8229 8.5515C3.77655 8.54911 3.7303 8.55771 3.68791 8.57658C3.64551 8.59546 3.60818 8.62409 3.57895 8.66013C3.52955 8.73009 3.50977 8.81673 3.5239 8.9012C3.53804 8.98567 3.58495 9.06114 3.65443 9.11121L3.65904 9.11489L3.67561 9.1287L3.72163 9.16552C3.80449 9.22076 3.88918 9.27047 3.97663 9.31465C4.13865 9.40671 4.29147 9.5135 4.43232 9.63501C4.46898 9.68701 4.49035 9.74824 4.494 9.81176L4.5925 9.89922C4.05035 10.7125 3.82744 11.6972 3.96651 12.6646L3.83763 12.7024C3.80427 12.7561 3.75929 12.8017 3.70599 12.8358C3.52646 12.8837 3.34271 12.9139 3.15732 12.9261C3.05877 12.9281 2.96041 12.9357 2.86274 12.9491L2.80566 12.9629L2.78081 12.9684H2.77805L2.77344 12.9703C2.73132 12.9762 2.69089 12.9908 2.65471 13.0132C2.61853 13.0356 2.58739 13.0653 2.56327 13.1003C2.53914 13.1354 2.52254 13.175 2.51453 13.2168C2.50652 13.2586 2.50727 13.3016 2.51673 13.3431C2.52619 13.3845 2.54415 13.4236 2.56948 13.4578C2.59482 13.492 2.62697 13.5205 2.6639 13.5416C2.70084 13.5627 2.74175 13.576 2.78406 13.5805C2.82637 13.5849 2.86915 13.5806 2.90969 13.5677H2.91429L2.91889 13.5659H2.92074C2.9284 13.564 2.93607 13.5621 2.94375 13.5603L2.99991 13.5475C3.09366 13.5176 3.18557 13.4823 3.27516 13.4416C3.44765 13.3723 3.62647 13.3199 3.80909 13.2851C3.87261 13.2887 3.93384 13.3101 3.98584 13.3468L4.11932 13.3238C4.4192 14.2507 5.04789 15.0359 5.88682 15.5313L5.83159 15.6648C5.8576 15.7185 5.8672 15.7787 5.85921 15.8378C5.78188 16.0128 5.6889 16.1803 5.58119 16.3368C5.52159 16.4152 5.46657 16.4969 5.41641 16.5817L5.38879 16.6397L5.37775 16.6645C5.35593 16.7013 5.34204 16.7422 5.33694 16.7847C5.33185 16.8272 5.33567 16.8702 5.34816 16.9111C5.36065 16.952 5.38154 16.9899 5.40949 17.0223C5.43744 17.0546 5.47184 17.0808 5.51048 17.0991C5.54913 17.1175 5.59117 17.1275 5.63392 17.1287C5.67668 17.1298 5.7192 17.1221 5.75878 17.1059C5.79836 17.0896 5.83412 17.0653 5.86377 17.0345C5.89343 17.0037 5.91633 16.967 5.93101 16.9269V16.926C5.94351 16.8997 5.9564 16.8736 5.96968 16.8477C6.00466 16.7557 6.03412 16.6627 6.05805 16.5669C6.11052 16.3736 6.19061 16.1877 6.29556 16.0164C6.33197 15.9822 6.37784 15.9598 6.4272 15.952L6.49716 15.8259C7.4072 16.1758 8.41424 16.1785 9.32609 15.8332C9.34785 15.8724 9.36933 15.9116 9.39053 15.9511C9.45319 15.9607 9.50948 15.9948 9.54703 16.0459C9.63425 16.2104 9.70517 16.3831 9.75876 16.5614C9.78269 16.6572 9.81215 16.751 9.84713 16.8431L9.87475 16.9011L9.88488 16.9214C9.90267 16.9723 9.9336 17.0177 9.97455 17.0528C10.0155 17.088 10.065 17.1117 10.118 17.1216C10.1711 17.1315 10.2258 17.1273 10.2767 17.1092C10.3276 17.0912 10.3728 17.06 10.4078 17.0189C10.45 16.9699 10.4757 16.9089 10.4813 16.8445C10.4869 16.78 10.4721 16.7155 10.4391 16.6599L10.428 16.636L10.3995 16.5771C10.3493 16.4923 10.2943 16.4106 10.2347 16.3322C10.1285 16.1794 10.0376 16.0166 9.96312 15.8461C9.94678 15.7849 9.95538 15.7197 9.98706 15.6648Z"
        fill="currentColor"
      />
      <path
        d="M17.8258 1.32833L17.4018 1.06055C17.1928 0.928737 17.0714 0.930264 16.8925 1.1037L13.8111 4.08801L12.3771 3.15299C12.1792 3.02257 12.0555 3.02951 11.8928 3.18907L11.5656 3.52345C11.3996 3.68745 11.4208 3.78055 11.617 3.90917L13.6608 5.23587C13.8712 5.37462 13.9896 5.36032 14.1523 5.20507L17.879 1.72792C18.054 1.56281 18.0434 1.46416 17.8258 1.32833Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Validation;