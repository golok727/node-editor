import "./style.css";
import { Editor } from "node-editor";

const root = document.getElementById("app")!;

const editor = new Editor(true);
root.append(editor.canvas);

editor.resize(editor.canvas.offsetWidth, editor.canvas.offsetHeight);

editor.init();
