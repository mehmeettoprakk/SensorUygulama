import { faSliders, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
//BURASI KARTLARI YAPICAGIMIZ YER

function SensorCard({ items }: { items: any }) {
  const [menus, setMenus] = useState<{ [key: number]: boolean }>({});
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleMenu = (id: number) => {
    // setMenu(!menu);
    setMenus((prevMenus) => ({
      ...prevMenus,
      [id]: !prevMenus[id],
    }));
  };
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const menuKeys = Object.keys(menuRefs.current);

    for (const key of menuKeys) {
      if (
        menuRefs.current[Number(key)] &&
        !menuRefs.current[Number(key)]?.contains(target)
      ) {
        setMenus((prevMenus) => ({
          ...prevMenus,
          [Number(key)]: false,
        }));
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [activeRows, setActiveRows] = useState(items.map(() => false));

  const handleClick = (index: any) => {
    const newActiveRows = [...activeRows];
    newActiveRows[index] = !newActiveRows[index];
    setActiveRows(newActiveRows);
  };
  const deleteItem = async (id: any) => {
    try {
      const response = await fetch(`/api/delete_sensor`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return items.map((item: any) => (
    <div className="col-lg-3 col-6">
      <div className="small-box bg-info">
        <div className="inner">
          <h3>150</h3>
          <p>id:{item.id}</p>
          <p>ad:{item.ad}</p>
          <p>Durum:{item.acik_kapali}</p>
          <p>Aciklama:{item.aciklama}</p>
        </div>
        <div
          key={item.id}
          className="
        text-center nav-item dropdown"
          onClick={() => toggleMenu(item.id)}
          ref={(el) => (menuRefs.current[item.id] = el)}
        >
          <div
            style={{ cursor: "pointer" }}
            className=" pe-auto nav-link dropdown-toggle user-action text-center"
          >
            Düzenle
            <div
              className={`text-center dropdown-menu ${
                menus[item.id] ? "show" : ""
              }`}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button
                onClick={() => deleteItem(item.id)}
                type="button"
                className="dropdown-item"
              >
                <FontAwesomeIcon
                  style={{ marginRight: "0.5em", color: "red" }}
                  icon={faTrash}
                />
                Sil
              </button>
              <button type="button" className="dropdown-item">
                <FontAwesomeIcon
                  style={{ marginRight: "0.7em" }}
                  icon={faSliders}
                />
                Düzenle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
export default SensorCard;
