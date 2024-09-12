import type { Container } from "./layout";
import type { View } from "./layout/view";

// an item which can be rendered
export interface Renderable extends Container, View {}
