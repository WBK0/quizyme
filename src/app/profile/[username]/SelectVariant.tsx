import SelectButton from "@/components/SelectButton";

const SelectVariant = () => {
  return (
    <div className="mt-8">
      <SelectButton
        options={['about me', 'quizzes', 'flashcards']}
      />
    </div>
  )
}
export default SelectVariant;