import React, { useEffect, useRef, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getToken } from "../../../lib/cookie";
import {
  api_getFullCategories,
  api_addCategory,
  api_editCatgory,
} from "../../../lib/fetcher";
import { TCategoryDetail } from "../../../lib/types";
import "./index.css";

const EditCategoryScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  const [categories, setCategories] = useState<TCategoryDetail[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const refItems = useRef<any[]>([]);

  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
      return;
    }

    api_getFullCategories().then((c) => {
      setCategories(c);
    });

    setAuthed(true);
  }, []);

  const edit = () => {
    const editted = refItems.current.map((r) => {
      const prio = r.lastElementChild.value;
      const id = r.lastElementChild.previousSibling.value;
      const name = r.firstElementChild.value;
      return { id: Number(id), name, priority: Number(prio) };
    });

    api_editCatgory(editted).then((result) => {
      alert(result ? "정상 반영 되었습니다" : "반영 실패했습니다");
    });
  };

  const moveUp = (target: any) => {
    const container = target.parentNode;
    const priority = Number(container.lastElementChild.value);

    if (priority === 1) return;

    const prevContainer: HTMLDivElement = refItems.current[priority - 2];

    // ---- priority 변경
    // @ts-ignore
    prevContainer.lastElementChild.value = priority;
    container.lastElementChild.value = priority - 1;

    // ---- 위치 이동
    prevContainer.style.top =
      Number(prevContainer.offsetTop) + prevContainer.offsetHeight + "px";
    container.style.top =
      Number(container.offsetTop) - container.offsetHeight + "px";

    // ---- refItems 갱신
    refItems.current = [
      ...refItems.current.slice(0, priority - 2),
      container,
      prevContainer,
      ...refItems.current.slice(priority),
    ];
  };

  const moveDown = (target: any) => {
    const container = target.parentNode;
    const priority = Number(container.lastElementChild.value);

    if (priority === categories.length) return;

    const nextContainer: HTMLDivElement = refItems.current[priority];

    // ---- priority 변경
    // @ts-ignore
    nextContainer.lastElementChild.value = priority;
    container.lastElementChild.value = priority + 1;

    // ---- 위치 이동
    nextContainer.style.top =
      Number(nextContainer.offsetTop) - nextContainer.offsetHeight + "px";
    container.style.top =
      Number(container.offsetTop) + container.offsetHeight + "px";

    // ---- refItems 갱신
    refItems.current = [
      ...refItems.current.slice(0, priority - 1),
      nextContainer,
      container,
      ...refItems.current.slice(priority + 1),
    ];
  };

  const onAddCategory = () => {
    const newCategory: HTMLInputElement | null =
      document.querySelector("#iNewCategory");
    if (!newCategory) return;

    const newName = newCategory.value;
    if (!newName.length) {
      alert("새 카테고리의 이름을 입력해 주세요");
      return;
    }

    api_addCategory(newName)
      .then(() => {
        // 추가 후
        setVisibleModal(false);
        return api_getFullCategories();
      })
      .then((c) => {
        console.log(c);

        refItems.current = [];
        setCategories(c);
      });
  };

  const deleteCategory = (target: any) => {
    const container = target.parentNode;
    const priority = Number(container.lastElementChild.value);

    const nextPart = refItems.current.slice(priority);

    nextPart.forEach((r) => {
      const curPriority = Number(r.lastElementChild.value);

      r.style.top = Number(r.offsetTop) - r.offsetHeight + "px";

      r.lastElementChild.value = curPriority - 1;
    });

    refItems.current = [
      ...refItems.current.slice(0, priority - 1),
      ...nextPart,
    ];

    container.parentNode.removeChild(container);
  };

  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="editCategory">
      <h1>Edit Category</h1>

      <div className="adm-category-list-wrapper">
        {categories.map((c, i) => {
          // # 나열
          return (
            <div
              className="adm-category-item-wrapper"
              key={c.id}
              ref={(r) => {
                refItems.current.length !== categories.length &&
                  r !== null &&
                  refItems.current.push(r);
              }}
              style={{ top: `${100 * i}px` }}
            >
              <input defaultValue={c.name} />
              <button onClick={({ target }) => moveUp(target)}>▲</button>
              <button onClick={({ target }) => moveDown(target)}>▼</button>
              <button onClick={({ target }) => deleteCategory(target)}>
                삭제
              </button>
              <input type="hidden" value={c.id} />
              <input type="hidden" value={c.priority} />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setVisibleModal(true);
        }}
      >
        추가
      </button>
      <button onClick={edit}>반영</button>

      {visibleModal && (
        <div className="adm-write-category-wrapper">
          select category
          <div>
            <input type="text" id="iNewCategory" />
            <button onClick={onAddCategory}>ADD</button>
          </div>
        </div>
      )}
    </LayoutAdm>
  );
};

export default EditCategoryScreen;
