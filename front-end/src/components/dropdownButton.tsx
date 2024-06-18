import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup, FormControlLabel } from "@mui/material";

type FileFormatDialogProps = {
    open: boolean;
    onClose: (format: string | null) => void;
};

const FileFormatDialog = ({ open, onClose }: FileFormatDialogProps) => {
    const [selectedFormat, setSelectedFormat] = React.useState<string>('json');

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat((event.target as HTMLInputElement).value);
    };

    const handleClose = () => {
        onClose(null);
    };

    const handleDownload = () => {
        onClose(selectedFormat);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select File Format</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please select the format in which you want to download the data.
                </DialogContentText>
                <RadioGroup value={selectedFormat} onChange={handleFormatChange}>
                    <FormControlLabel value="json" control={<Radio />} label="JSON" />
                    <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDownload} variant="contained">Download</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileFormatDialog;
