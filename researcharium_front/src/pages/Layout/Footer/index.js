// import React, { useEffect, useState } from 'react';
// import { Box, Link, Stack } from '@mui/material';
// import { styled } from '@mui/system';
// import { useDispatch, useSelector } from 'react-redux';

// export default function Footer(props) {
//   const { sx = {} } = props;

//   const selector = state => {
//     return {
//       rightLink: state.Common.rightLink,
//       copyrightLink: state.Common.copyrightLink,
//       termsOfUseLink: state.Common.termsOfUseLink,
//       privacyLink: state.Common.privacyLink,
//       ICPLink: state.Common.ICPLink,
//       hasLinkValue: state.Common.hasLinkValue,
//     };
//   };
//   const {
//     rightLink,
//     copyrightLink,
//     termsOfUseLink,
//     privacyLink,
//     ICPLink,
//     hasLinkValue,
//   } = useSelector(selector);
//   const dispatch = useDispatch();

//   const [rightLinkValue, setRightLink] = useState(rightLink);
//   const [copyrightLinkValue, setCopyrightLink] = useState(copyrightLink);
//   const [termsOfUseLinkValue, setTermsOfUseLink] = useState(termsOfUseLink);
//   const [privacyLinkValue, setPrivacyLink] = useState(privacyLink);
//   const [ICPLinkValue, setICPLink] = useState(ICPLink);

//   useEffect(() => {
//     var hasLink = localStorage.getItem('hasFooterLink');
//     if (hasLink !== 'true') {
//       dispatch(getFooterLink());
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     var rightLink = localStorage.getItem('rightLinkValue');
//     var copyrightLink = localStorage.getItem('copyrightLinkValue');
//     var termsOfUseLink = localStorage.getItem('termsOfUseLinkValue');
//     var privacyLink = localStorage.getItem('privacyLinkValue');
//     var ICPLink = localStorage.getItem('ICPLinkValue');
//     // console.log(rightLink)
//     setRightLink(rightLink);
//     setCopyrightLink(copyrightLink);
//     setTermsOfUseLink(termsOfUseLink);
//     setPrivacyLink(privacyLink);
//     setICPLink(ICPLink);
//   }, [hasLinkValue]);

//   const StyledLink = styled(Link)({
//     fontFamily: 'Open Sans',
//     fontSize: '12px',
//     color: '#FFFFFF',
//   });

//   let osanoDOM;
//   function openOsano() {
//     if (!osanoDOM) {
//       osanoDOM = document.getElementsByClassName('osano-cm-widget')[0];
//     }
//     if (osanoDOM) {
//       osanoDOM.click();
//     }
//   }
//   return (
//     <Box
//       id='PageFooter'
//       sx={{
//         background: '#154AB6',
//         padding: '11px',
//         border: '1px solid #dddddd',
//         bottom: 0,
//         zIndex: 1100,
//         ...sx,
//       }}
//     >
//       <Stack
//         direction='column'
//         justifyContent='center'
//         alignItems='center'
//         spacing={1}
//         sx={{
//           fontWeight: 400,
//         }}
//       >
//         {/* 第一层三个链接 */}
//         <Stack
//           direction='row'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//           sx={{
//             fontSize: '14px',
//           }}
//         >
//           <StyledLink
//             id='footerPrivacyPolicyLink'
//             href={privacyLinkValue}
//             underline='none'
//             sx={{
//               fontSize: '14px',
//             }}
//           >
//             {'Privacy Policy'}
//           </StyledLink>
//           <StyledLink
//             id='footerTermsOfUseLink'
//             href={termsOfUseLinkValue}
//             underline='none'
//             sx={{
//               fontSize: '14px',
//               // marginLeft : "40px"
//             }}
//           >
//             {'Terms of Use'}
//           </StyledLink>
//           {
//             <StyledLink
//               id='footerRightsAndPermissionsLink'
//               href={rightLinkValue}
//               underline='none'
//               sx={{
//                 fontSize: '14px',
//                 // marginLeft : "40px"
//               }}
//             >
//               Rights & Permissions
//             </StyledLink>
//           }
//           <StyledLink
//             id='footerCookieManagementLink'
//             href='#'
//             underline='none'
//             sx={{
//               fontSize: '14px',
//               // marginLeft : "40px"
//             }}
//             onClick={openOsano}
//           >
//             Cookie Management
//           </StyledLink>
//         </Stack>

//         {/* //第二层链接 */}
//         <Stack
//           direction='row'
//           justifyContent='center'
//           alignItems='center'
//           spacing={2}
//           sx={{
//             '& .MuiTypography-root': { fontWeight: 400, color: '#DFE4E8' },
//           }}
//         >
//           <StyledLink
//             id='footerCopyrightLink'
//             href={copyrightLinkValue}
//             underline='none'
//           >
//             {'© Copyright 2023. All rights reserved.'}
//           </StyledLink>
//           <StyledLink
//             id='footerICPLink'
//             href={ICPLinkValue}
//             underline='none'
//             sx={{ fontWeight: 400 }}
//           >
//             {/*{'沪ICP备2021007181号'}*/}
//             {'ICP备2021007181'}
//           </StyledLink>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }
