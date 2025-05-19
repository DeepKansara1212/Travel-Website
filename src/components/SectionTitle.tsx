import type React from "react"

interface SectionTitleProps {
  title: string
  description?: string
  icon?: React.ElementType<{ className?: string }>
  id?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description, icon: Icon, id }) => {
  return (
    <div className="mb-12 text-center" id={id}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

export default SectionTitle
