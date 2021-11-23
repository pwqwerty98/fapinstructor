import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";

import { deleteProfile } from "@/common/store/currentUser";
import { Head } from "@/components/Head";
import { Page } from "@/components/Templates";

import { ProfileCard } from "../components/ProfileCard";
import { DeleteProfileModal } from "../components/DeleteProfileModal";

export function Profile() {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Page>
      <Head title="Profile" />
      <Box mb={2}>{false && <ProfileCard />}</Box>
      <DeleteProfileModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          dispatch(deleteProfile());
        }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setDeleteModalOpen(true);
        }}
      >
        Delete Account
      </Button>
    </Page>
  );
}
