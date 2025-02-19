export type ModalType = {
    openModal: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void | undefined | null
}

export type ChartType = {
    dataIn: any[] | null;
    dataOut: any[] | null;
}