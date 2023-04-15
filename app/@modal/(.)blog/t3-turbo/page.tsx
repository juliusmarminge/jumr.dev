import React from "react";

import PageContent from "~/app/blog/t3-turbo/page.mdx";
import { Modal } from "~/components/modal";

export default function TestModal() {
  return (
    <Modal>
      <PageContent />
    </Modal>
  );
}
