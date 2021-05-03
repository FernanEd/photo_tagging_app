import { LevelTarget } from "../../layouts/Game";

interface Props {
  position: [number, number];
  targets: LevelTarget[];
  handleMenuSelection: ([x, y]: [number, number]) => void;
}

const TargetMenu: React.FunctionComponent<Props> = ({
  position,
  targets,
  handleMenuSelection,
}) => {
  const offset = 5;
  const [x, y] = position;

  const menuToLeft = x < window.innerWidth / 2;
  const menuToTop = y < window.innerHeight / 2;

  console.log(x, y, menuToLeft, menuToTop);

  let positionStyle = {
    left: x,
    top: y,
    transform: `translate(${menuToLeft ? "0" : "-100%"}, ${
      menuToTop ? "0" : "-100%"
    })`,
  };

  return (
    <div
      className="fixed bg-gray-800 text-white rounded shadow p-1 object-contain"
      style={positionStyle}
    >
      <ul className="list-none flex flex-col gap-1">
        {targets.map((target, i) => (
          <li
            key={i}
            className="p-1 bg-gray-600 text-center rounded cursor-pointer hover:bg-gray-500"
            onClick={() => handleMenuSelection(target.coords)}
          >
            {target.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetMenu;
