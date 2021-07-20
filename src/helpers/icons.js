import { library } from "@fortawesome/fontawesome-svg-core";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSignOutAlt, faEdit, faSpinner, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Icons = () => {
  return library.add(faTrashAlt, faSignOutAlt, faEdit, faSpinner, faPlusCircle);
}

export default Icons;