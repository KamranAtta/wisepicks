export default interface propsInterface {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose(): void;
}
