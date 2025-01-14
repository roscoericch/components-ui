export interface ModalProps {
  open?: boolean; //modal open state
  onClose?: () => void; //call back function on modal close
  children?: React.ReactNode;
  centered?: boolean; //modal position centered
  maskClosable?: boolean; // default: true
  closeable?: boolean; //add closable icon
}
