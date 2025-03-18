import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
  
export function FoldableCard({ question, answer, value, onToggle, isOpen }) {
  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full h-full"
      value={isOpen ? value : undefined}
      onValueChange={(val) => onToggle(val ? value : null)}
    >
      <AccordionItem value={value || "item-1"} className="border border-gray-200 rounded-md">
        <AccordionTrigger className="px-4 font-medium">
          {question || "Is it accessible?"}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          {answer || "Yes. It adheres to the WAI-ARIA design pattern."}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}