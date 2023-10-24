import { Box, Stack, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

interface MediaSetProps {
    media: string[] | null
}

export default function AboutMediaSet({media}: MediaSetProps) {
    const [selectedMedia, setSelectedMedia] = useState<string|null>(null)
    return (
        <Stack spacing={1}>
            <Box
                sx={{
                    width: 1,
                    height: 390
                }}
            >
                {selectedMedia?<img src={selectedMedia}/>:<></>}
            </Box>
            <ImageList sx={{
                    width: 1,
                    height: 90
                }}
            >
                {media?media.map(item => (
                    <ImageListItem key={item} sx={{width: 90, height: 90, borderRadius: 2}}>
                        <img
                            src={`${item}?w=90&h=90&fit=crop&auto=format`}
                            loading="lazy"
                        />
                    </ImageListItem>
                )): null}
                <Box sx={{width: 90, height: 90, borderRadius: 2, backgroundColor: "gray"}}>
                    <AddIcon/>
                </Box>
            </ImageList>
        </Stack>
    )
}