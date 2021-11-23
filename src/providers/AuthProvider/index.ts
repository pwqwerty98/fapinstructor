import { connect } from "react-redux";

import { fetchProfile } from "@/common/store/currentUser";

export default connect(null, { fetchProfile });
