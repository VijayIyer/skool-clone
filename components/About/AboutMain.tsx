import { Box, Stack } from "@mui/material";
import AboutMediaSet from "./AboutMediaSet";
import AboutTextEditor from "./AboutTextEditor";
import AboutTagBar from "./AboutTagBar";
import { Group } from "@/interfaces/group.type";

interface AboutMainProps {
    group: Group;
    creator: {
        fullName: string
    };
    memberNum: number;
}

export default function AboutMain({group, creator, memberNum}:AboutMainProps) {
    return (
        <Box
            sx={{
                maxWidth: 760,
                height: 3 / 4,
                backgroundColor: "white",
                borderRadius: 2,
                p: 3
            }}
        >   
            <Stack spacing={2}>
                <h2>{group.name}</h2>
                <AboutMediaSet media={group.about.media}/>
                <AboutTagBar type={group.type} memberNum={memberNum} paymentType={group.paymentType} creator={creator}/>
                <AboutTextEditor text={group.about.text}/>
            </Stack>
        </Box>
    )
}