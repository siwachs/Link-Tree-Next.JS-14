const SectionBox: React.FC<{
  children: React.ReactNode;
  classNames?: string;
}> = ({ children, classNames }) => {
  return (
    <div className={`m-4 bg-white p-4 shadow sm:m-8 ${classNames}`}>
      {children}
    </div>
  );
};

export default SectionBox;
