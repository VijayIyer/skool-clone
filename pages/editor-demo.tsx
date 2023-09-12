import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import {
  TextField,
  IconButton,
  Button,
  Icon,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import TextEditor, { TextEditorRef } from "@/components/TextEditor";

const inter = Inter({ subsets: ["latin"] });
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAddLink } from "@/components/TextEditor/hooks";
import { red } from "@mui/material/colors";

export default function Home() {
  const ref = useRef<TextEditorRef | null>(null);
  const [link, setLink] = useState<string>("https://google.com");
  const [emojiUnicode, setEmojiUnicode] = useState<string>("1f602");
  // const [readOnly, setReadOnly] = useState<boolean>(true);
  // const [initialData, setInitialData] = useState<string>("");
  const { isAddLinkDisabled, addLink } = useAddLink("test-editor");

  useEffect(() => {
    fetch("/api/editor-test")
      .then((data) => data.text())
      .then((json) => setInitialData(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (readOnly) return;
    ref.current.focus();
  }, [readOnly]);

  return (
    <>
      <Head>
        <title>Text Editor Demo</title>
        <meta name="description" content="Text Editor Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Stack spacing={4}>
          <h1>Text Editor Demo</h1>
          <TextEditor
            id="test-editor"
            placeholder="Write Something..."
            ariaLabel="add post"
            ref={ref}
            readOnly={readOnly}
            initialData={initialData}
          />
          <Stack spacing={4} alignItems="center">
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="Link"
                variant="outlined"
                value={link}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setLink(event.target.value)
                }
              />
              <IconButton
                disabled={isAddLinkDisabled}
                onClick={() => {
                  addLink(link);
                }}
              >
                <InsertLinkIcon />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="Emoji Unicode"
                variant="outlined"
                value={emojiUnicode}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmojiUnicode(event.target.value)
                }
              />
              <IconButton
                disabled={isAddLinkDisabled}
                onClick={() => {
                  if (ref.current) ref.current.insertEmoji(emojiUnicode);
                }}
              >
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Stack>
            <FormControlLabel
              label="Read Only"
              control={
                <Switch
                  checked={readOnly}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setReadOnly(event.target.checked)
                  }
                />
              }
            />
          </Stack>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (ref.current) console.log(ref.current.getData());
              else return [];
            }}
          >
            Console Log Serialize Data
          </Button>
        </Stack>
      </main>
    </>
  );
}
