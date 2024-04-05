import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotsNine } from "../icons";
import { chunk, compact } from "lodash";
import { group } from "../utils";
import { useSelector } from "react-redux";
import usePosts from "../hooks/usePosts";
import ProfilePicture from "../common/ProfilePicture";

const feeds = [
  {
    user_id: 1,
    username: "vlittler0",
    full_name: "Valma Littler",
    gender: "Female",
    birthdate: "4/2/1986",
    location: "Room 839",
    email: "vlittler0@deviantart.com",
    phone_number: "217-708-9038",
    profile_pic:
      "https://robohash.org/quiseligendibeatae.png?size=50x50&set=set1",
    bio: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  },
  {
    user_id: 2,
    username: "akenewel1",
    full_name: "Amandi Kenewel",
    gender: "Female",
    birthdate: "1/25/1986",
    location: "Apt 245",
    email: "akenewel1@usnews.com",
    phone_number: "328-940-0724",
    profile_pic: "https://robohash.org/quasicumducimus.png?size=50x50&set=set1",
    bio: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  },
  {
    user_id: 3,
    username: "vbolgar2",
    full_name: "Vivie Bolgar",
    gender: "Female",
    birthdate: "8/1/1969",
    location: "20th Floor",
    email: "vbolgar2@so-net.ne.jp",
    phone_number: "344-353-8082",
    profile_pic:
      "https://robohash.org/excepturiincidunteos.png?size=50x50&set=set1",
    bio: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  },
  {
    user_id: 4,
    username: "rscholtis3",
    full_name: "Robbi Scholtis",
    gender: "Female",
    birthdate: "10/9/1976",
    location: "PO Box 60134",
    email: "rscholtis3@arstechnica.com",
    phone_number: "882-976-3253",
    profile_pic:
      "https://robohash.org/inciduntquodeserunt.png?size=50x50&set=set1",
    bio: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
  {
    user_id: 5,
    username: "ctolcharde4",
    full_name: "Claudine Tolcharde",
    gender: "Female",
    birthdate: "3/31/1950",
    location: "PO Box 91404",
    email: "ctolcharde4@netscape.com",
    phone_number: "212-275-9488",
    profile_pic: "https://robohash.org/temporaetautem.png?size=50x50&set=set1",
    bio: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
  },
  {
    user_id: 6,
    username: "iollerearnshaw5",
    full_name: "Issy Ollerearnshaw",
    gender: "Female",
    birthdate: "8/22/1987",
    location: "PO Box 36700",
    email: "iollerearnshaw5@cloudflare.com",
    phone_number: "677-723-4393",
    profile_pic: "https://robohash.org/estveniamitaque.png?size=50x50&set=set1",
    bio: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    user_id: 7,
    username: "uorudden6",
    full_name: "Ursulina O'Rudden",
    gender: "Female",
    birthdate: "3/14/1958",
    location: "Suite 41",
    email: "uorudden6@stanford.edu",
    phone_number: "518-794-8810",
    profile_pic: "https://robohash.org/enimquisitaque.png?size=50x50&set=set1",
    bio: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    user_id: 8,
    username: "lhoodspeth7",
    full_name: "Lorinda Hoodspeth",
    gender: "Female",
    birthdate: "11/5/1968",
    location: "Apt 1197",
    email: "lhoodspeth7@ebay.com",
    phone_number: "738-354-8970",
    profile_pic:
      "https://robohash.org/quodrepellendusducimus.png?size=50x50&set=set1",
    bio: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
  },
  {
    user_id: 9,
    username: "itolemache8",
    full_name: "Ivory Tolemache",
    gender: "Female",
    birthdate: "9/13/1975",
    location: "Suite 46",
    email: "itolemache8@cbslocal.com",
    phone_number: "830-388-7153",
    profile_pic:
      "https://robohash.org/quamveritatiscorrupti.png?size=50x50&set=set1",
    bio: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    user_id: 10,
    username: "kburehill9",
    full_name: "Kevyn Burehill",
    gender: "Female",
    birthdate: "10/25/1972",
    location: "PO Box 92751",
    email: "kburehill9@gizmodo.com",
    phone_number: "126-676-4349",
    profile_pic: "https://robohash.org/sequiquamenim.png?size=50x50&set=set1",
    bio: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  },
  {
    user_id: 11,
    username: "ygudgena",
    full_name: "Yasmin Gudgen",
    gender: "Female",
    birthdate: "2/8/1982",
    location: "13th Floor",
    email: "ygudgena@symantec.com",
    phone_number: "123-489-1397",
    profile_pic:
      "https://robohash.org/sequiestrepudiandae.png?size=50x50&set=set1",
    bio: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  },
  {
    user_id: 12,
    username: "mdeib",
    full_name: "Minetta Dei",
    gender: "Female",
    birthdate: "4/5/1976",
    location: "Apt 1832",
    email: "mdeib@salon.com",
    phone_number: "467-699-0692",
    profile_pic: "https://robohash.org/dolorequiased.png?size=50x50&set=set1",
    bio: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  },
  {
    user_id: 13,
    username: "srosebyc",
    full_name: "Seth Roseby",
    gender: "Male",
    birthdate: "2/2/1953",
    location: "Apt 1580",
    email: "srosebyc@paginegialle.it",
    phone_number: "920-495-9638",
    profile_pic:
      "https://robohash.org/quiducimusincidunt.png?size=50x50&set=set1",
    bio: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
  {
    user_id: 14,
    username: "rkepped",
    full_name: "Rockwell Keppe",
    gender: "Male",
    birthdate: "7/23/2004",
    location: "PO Box 30742",
    email: "rkepped@fema.gov",
    phone_number: "850-316-2244",
    profile_pic: "https://robohash.org/eiusutassumenda.png?size=50x50&set=set1",
    bio: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  },
  {
    user_id: 15,
    username: "cyoulese",
    full_name: "Cazzie Youles",
    gender: "Male",
    birthdate: "12/7/1955",
    location: "PO Box 55100",
    email: "cyoulese@google.it",
    phone_number: "699-223-2274",
    profile_pic: "https://robohash.org/solutasaepenon.png?size=50x50&set=set1",
    bio: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  },
  {
    user_id: 16,
    username: "kablewhitef",
    full_name: "Kanya Ablewhite",
    gender: "Genderfluid",
    birthdate: "12/29/2002",
    location: "Apt 2",
    email: "kablewhitef@skyrock.com",
    phone_number: "124-411-1844",
    profile_pic:
      "https://robohash.org/molestiaseosfacere.png?size=50x50&set=set1",
    bio: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
  },
  {
    user_id: 17,
    username: "emashrog",
    full_name: "Ewan Mashro",
    gender: "Male",
    birthdate: "10/11/1987",
    location: "PO Box 59806",
    email: "emashrog@ucoz.ru",
    phone_number: "408-815-2142",
    profile_pic:
      "https://robohash.org/reprehenderitiustovoluptatum.png?size=50x50&set=set1",
    bio: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  },
  {
    user_id: 18,
    username: "wambrosettih",
    full_name: "Ware Ambrosetti",
    gender: "Male",
    birthdate: "7/31/1975",
    location: "Room 1960",
    email: "wambrosettih@goodreads.com",
    phone_number: "173-400-0705",
    profile_pic:
      "https://robohash.org/omnisconsequunturquia.png?size=50x50&set=set1",
    bio: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  },
  {
    user_id: 19,
    username: "odeetchi",
    full_name: "Opaline Deetch",
    gender: "Female",
    birthdate: "7/20/1966",
    location: "Room 92",
    email: "odeetchi@myspace.com",
    phone_number: "373-602-4364",
    profile_pic: "https://robohash.org/atquesedquod.png?size=50x50&set=set1",
    bio: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  },
  {
    user_id: 20,
    username: "hmcgrielej",
    full_name: "Helga McGriele",
    gender: "Female",
    birthdate: "7/30/1983",
    location: "Room 556",
    email: "hmcgrielej@devhub.com",
    phone_number: "167-776-8983",
    profile_pic:
      "https://robohash.org/namconsequaturfugit.png?size=50x50&set=set1",
    bio: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  },
  {
    user_id: 21,
    username: "awittierk",
    full_name: "Arvy Wittier",
    gender: "Male",
    birthdate: "9/29/1961",
    location: "Suite 99",
    email: "awittierk@narod.ru",
    phone_number: "931-679-9719",
    profile_pic: "https://robohash.org/utteneturquas.png?size=50x50&set=set1",
    bio: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  },
];
const Exp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const learnLodash = () => {
    console.log(feeds.length);
    setData(group(feeds, 2));
  };

  console.log(data);

  return (
    <div className="p-4 overflow-y-scroll h-dvh">
      <button
        onClick={handleMenuOpen}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <DotsNine />
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => console.log("Clicked Item 1")}>
          Item 1
        </MenuItem>
        <MenuItem onClick={() => console.log("Clicked Item 2")}>
          Item 2
        </MenuItem>
        <MenuItem onClick={() => console.log("Clicked Item 3")}>
          Item 3
        </MenuItem>
      </Menu>
      <button
        onClick={handleMenuOpen}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <DotsNine />
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => console.log("Clicked Item 1")}>
          Item 1
        </MenuItem>
        <MenuItem onClick={() => console.log("Clicked Item 2")}>
          Item 2
        </MenuItem>
        <MenuItem onClick={() => console.log("Clicked Item 3")}>
          Item 3
        </MenuItem>
      </Menu>

      <button
        onClick={learnLodash}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        lodash
      </button>

      <div className="grid grid-cols-2 p-2 gap-4">
        {data.map((subData) => {
          return <div >
            {
              subData.map(d=>{
                return <div key={d.user_id} className="rounded-md border my-4">
                  <ProfilePicture src={d.profile_pic} className={'size-10 rounded-full bg-gray-600'} />
                  <p>{d.full_name}</p>
                  <p>{d.username}</p>
                </div>
              })
            }
          </div>;
        })}
      </div>
    </div>
  );
};

export default Exp;

 function MenuItem({ onClick, children }) {
  return (
    <div className="py-2 px-4 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}

 function Menu({ anchorEl, open, onClose, children }) {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const calculatePosition = () => {
      if (anchorEl && open) {
        const { top, left, height } = anchorEl.getBoundingClientRect();
        setMenuPosition({ top: top + height, left });
      } else {
        setMenuPosition({ top: 100, left: 100 }); // Example fallback position
      }
    };

    calculatePosition(); // Initial position calculation
  }, [anchorEl, open]);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="fixed  top-0 left-0 w-full h-full bg-black opacity-50 z-50"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className="absolute bg-slate-400 border border-gray-300 shadow z-[-10]"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                onClick: () => {
                  handleClose();
                  child.props.onClick && child.props.onClick();
                },
              });
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

export { Menu, MenuItem };
