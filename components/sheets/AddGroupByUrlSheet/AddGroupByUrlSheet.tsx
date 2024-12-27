import React from "react";
import { getString } from "@/strings/translations";
import AddGroupByUrlForm from "@/components/forms/AddGroupByUrlForm";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";

const AddGroupByUrlSheet: React.FC = () => {
  return (
    <BaseBottomActionSheet
      snapPoints={[100]}
      title={getString("groups.addbyurl.title")}
    >
      <AddGroupByUrlForm />
    </BaseBottomActionSheet>
  );
};

export default AddGroupByUrlSheet;
