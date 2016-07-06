import { foo } from './module2';
import styles from './index.css';

var h1 = document.createElement('h1');
h1.classList.add(styles.header);
h1.appendChild(document.createTextNode(foo));

export default h1;
