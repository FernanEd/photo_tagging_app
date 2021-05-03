interface Props {
  targets: string[];
}

const TargetMenu: React.FunctionComponent<Props> = ({ targets }) => {
  return (
    <div className="fixed bg-gray-700 text-white">
      {targets.map((target) => (
        <li>{target}</li>
      ))}
    </div>
  );
};

export default TargetMenu;
