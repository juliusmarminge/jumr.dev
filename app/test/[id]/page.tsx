export default function TestPage(props: { params: { id: string } }) {
  return <div>Yooo {props.params.id}</div>;
}
