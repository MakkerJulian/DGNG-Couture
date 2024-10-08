import { Modal } from "@mui/base"
import { Backdrop, Button, Fade, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { FormEventHandler } from "react"

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    title: string,
    children: React.ReactNode
    onSubmitText?: string
}

export const CustomModal = ({
    open,
    setOpen,
    title,
    children,
    onSubmitText,
    onSubmit
}: Props) => (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
    >
        <Fade in={open}>
            <form onSubmit={onSubmit}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '30%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgb(255,255,235,1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 4,
                        borderRadius: '10px',
                        border: "solid darkgray 2px",
                        '@media (max-width: 600px)': {
                            width: '80vw',
                        },
                        '@media (min-width: 601px) and (max-width: 1024px)': {
                            width: '60vw',
                        },
                    }}>
                    <Typography id="modal-modal-title" variant="h2" component="h2" fontWeight={"bold"}>
                        {title}
                    </Typography>
                    {children}

                    <Box display='flex' flexDirection={'row'} width={'88%'} justifyContent={'center'} padding={"25px"}>
                        <Button onClick={() => setOpen(false)} sx={{
                            bgcolor: 'darkgray',
                            color: 'white',
                            ":hover": {
                                backgroundColor: "gray"
                            },
                            width: "45%",
                            margin: "2px"
                        }}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: 'green',
                                color: 'white',
                                ":hover": {
                                    backgroundColor: 'darkgreen',
                                },
                                width: "45%",
                                margin: "2px"
                            }}>
                            {onSubmitText ?? "Submit"}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Fade>
    </Modal>
)