function generateId (componentName = "", elementName = "") {
    return `id-${Math.random().toString().substring(2, 6)}-sit-canvas-${componentName}-${elementName}`;
}

export { generateId as default };
