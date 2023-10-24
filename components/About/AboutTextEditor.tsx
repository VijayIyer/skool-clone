import { Box } from "@mui/material";
import { useState } from "react";

interface AboutTextEditorProps {
    text: string
}

export default function AboutTextEditor({ text }: AboutTextEditorProps) {
    return (
        <Box 
            sx={{ 
                width: 1, 
                height: 52, 
                borderRadius: 2,
                fontSize: 16,
                '&:hover': {
                    backgroundColor: 'grey',
                },
            }}
        >
            <span>{text}</span>
        </Box>
    )
}