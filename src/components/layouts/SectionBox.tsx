const SectionBox: React.FC<{
  children: React.ReactNode;
  classNames?: string;
}> = ({ children, classNames }) => {
  return (
    <div className={`m-8 bg-white p-4 shadow ${classNames}`}>{children}</div>
  );
};

export default SectionBox;
