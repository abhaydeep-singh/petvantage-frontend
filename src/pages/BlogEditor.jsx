// components/BlogEditor.jsx
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { ParticlesBackground } from "@/components";

const apiURL = import.meta.env.VITE_API_URL;

const BlogEditor = () => {
  const [htmlData, setHtmlData] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '<p class="text-white">Start writing your blog here...</p>',
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none min-h-[300px] outline-none",
      },
    },
    onUpdate({ editor }) {
      setHtmlData(editor.getHTML());
    },
  });

  async function handleSave(){
    if (!title.trim()) return alert("Please enter a blog title.");
    setLoading(true);
    try {
      const res = await axios.post(`${apiURL}/api/blog/add`, {
        title,
        content: htmlData,
      },{headers:{authorization:sessionStorage.getItem("token")}});
      
      console.log("Saved:", res.data);

      if (res.data.success) {
        toast.success("Blog Added Successfully!", { theme: "dark" });
        // setOpen(false);
      } else {
        toast.warn(`Error while adding Blog: ${res.data.message}`, { theme: "dark" });
      }

    } catch (err) {
      console.error("Error saving blog:", err);
      

    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className={`w-full h-screen ${false ? "sm:ml-64" : "sm:ml-16"}`}>
      <ParticlesBackground />
      <ToastContainer />
      <div className="p-4 min-h-screen text-white w-full">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full mb-4 p-2 text-lg font-bold bg-muted text-foreground rounded outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Toolbar */}
        {editor && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              variant="outline"
            >
              Bold
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              variant="outline"
            >
              Italic
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              variant="outline"
            >
              Underline
            </Button>
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              variant="outline"
            >
              H2
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant="outline"
            >
              Bullet List
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              variant="outline"
            >
              Ordered List
            </Button>
          </div>
        )}

        <div className="bg-accent p-4 rounded">
          <EditorContent editor={editor} />
        </div>
        {loading ? (
          <ClipLoader color="#FACC15" />
        ) : (
          <Button className="my-4" onClick={handleSave}>
            Save Blog
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
