import "./style.css";
import { Editor } from "node-editor";

(async () => {
	const editor = new Editor(true);
	await editor.init();

	const root = document.getElementById("app")!;

	root.append(editor.view);
})();
