import Image from 'next/image';
import logo from '/pogapp/asset/POGS_2.png';
import classNames from "classnames";

const Welcome = () => {
  return (
    <div className={classNames(
      "p-1.5 pb-0"
    )}>
      <Image src={logo} alt="My Image" width={100} overflow= 'hidden' />
    </div>
  );
};

export default Welcome;
