import { Modal } from "~/components/modal";

export default function TestModal(props: { params: { id: string } }) {
  return <Modal>Yooo {props.params.id}</Modal>;
}
