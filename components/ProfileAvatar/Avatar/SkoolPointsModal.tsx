// import React from "react";

// //Mui Imports
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// import Stack from "@mui/material/Stack";
// import Modal from "@mui/material/Modal";
// import useModalController from "@/hooks/useModalController";
// import IconButton from "@mui/material/IconButton";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import CancelIcon from "@mui/icons-material/Cancel";

// //modal style css
// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "454px",
//   bgcolor: "background.paper",
//   border: "1px solid rgb(228, 228, 228)",
//   borderRadius: "10px",
//   color: "rgb(32,33,36)",
//   p: 4,
//   lineHeight: 1.5,
// };

// const ModalHeader = styled(Typography)(() => ({
//   fontWeight: "bold",
//   fontSize: "23px",
//   margin: "0 0  16px",
// }));

// const ModalSubHeader = styled(Typography)(() => ({
//   fontWeight: "bold",
//   fontSize: "16px",
//   margin: "0 0  4px",
// }));

// const ModalParagraph = styled(Typography)(() => ({
//   margin: "0 0  16px",
// }));

// const CancelButtonIcon = styled(CancelIcon)({
//   color: "white",
//   fontSize: 50,
//   "&:hover": { color: "black" },
// });

// export default function SkoolPointsModal() {
//   const [isModalOpen, handleModalOpen, handleModalClose] = useModalController();
//   return (
//     <span>
//       <IconButton aria-label="close the modal" onClick={handleModalOpen}>
//         <HelpOutlineIcon color="disabled" fontSize="small" />
//       </IconButton>
//       <Modal
//         open={isModalOpen}
//         onClose={handleModalClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box>
//           <IconButton onClick={handleModalClose} aria-label="close the modal">
//             <CancelButtonIcon />
//           </IconButton>
//           <Box sx={modalStyle}>
//             <ModalHeader id="modal-modal-title" variant="h5" component="h1">
//               Skool points
//             </ModalHeader>
//             <ModalSubHeader variant="h6" component="h2">
//               Points
//             </ModalSubHeader>
//             <ModalParagraph id="modal-modal-description">
//               You earn points when other members like your posts or comments. 1
//               like = 1 point. This encourages users to produce quality content
//               and interact with other members in their community.
//             </ModalParagraph>
//             <ModalSubHeader variant="h6" component="h2">
//               Levels
//             </ModalSubHeader>
//             <ModalParagraph id="modal-modal-description">
//               As you gain points, you level up. Your level is shown at the
//               bottom right of your avatar. The number of points required to get
//               to the next level is shown under your avatar on your profile page.
//             </ModalParagraph>

//             <Stack direction="row" spacing={10}>
//               <Box>
//                 <Typography>Level 1 - 0 points</Typography>
//                 <Typography>Level 2 - 5 points</Typography>
//                 <Typography>Level 3 - 20 points</Typography>
//                 <Typography>Level 4 - 65 points</Typography>
//                 <Typography>Level 5 - 155 points</Typography>
//               </Box>
//               <Box>
//                 <Typography>Level 6 - 515 points</Typography>
//                 <Typography>Level 7 - 2,015 points</Typography>
//                 <Typography>Level 8 - 8,015 points</Typography>
//                 <Typography>Level 9 - 33,015 points</Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </Box>
//       </Modal>
//     </span>
//   );
// }
