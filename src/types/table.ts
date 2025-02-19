export type DynamicTableProps = {
    title?: string;
    columns?: string[];
    data?: any[];
    onDelete?: (e: string) => void,
    onUpdate?: (e: string, body: any) => void,
    onRestore?: (body: any) => void,
}