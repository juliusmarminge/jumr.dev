import PageContent from "~/app/blog/t3-turbo/page.mdx";
import { InterceptModal } from "../../intercept-modal";

export default function TestModal() {
  // const router = useRouter();

  return (
    <InterceptModal className="w-full overflow-y-scroll">
      {/* <div className="mx-auto max-w-2xl overflow-y-scroll bg-stone-800 px-16"> */}
      <PageContent />
      {/* </div> */}
    </InterceptModal>
  );
}
