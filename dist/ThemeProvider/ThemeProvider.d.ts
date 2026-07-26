import * as React from 'react';
import { ElementType, HTMLAttributes } from 'react';
export interface ThemeContextValue {
    prefixes: Record<string, string>;
    dir?: string;
}
export interface ThemeProviderProps extends Partial<ThemeContextValue> {
    children: React.ElementType;
}
declare const Consumer: React.Consumer<ThemeContextValue>;
declare function ThemeProvider({ prefixes, dir, children }: ThemeProviderProps): React.JSX.Element;
declare namespace ThemeProvider {
    var propTypes: any;
}
export declare function useBootstrapPrefix(prefix: string | undefined, defaultPrefix: string): string;
export declare function useIsRTL(): boolean;
declare function createBootstrapComponent(Component: any, opts: any): React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
interface CanvasComponentProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    variant?: string;
}
declare const CanvasWrapper: React.ForwardRefExoticComponent<CanvasComponentProps & React.RefAttributes<HTMLElement>>;
export { createBootstrapComponent, Consumer as ThemeConsumer, CanvasWrapper };
export default ThemeProvider;
