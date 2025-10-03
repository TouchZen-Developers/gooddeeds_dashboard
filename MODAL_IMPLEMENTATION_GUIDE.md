# Separate Modal Component Implementation Guide

## Overview
The modal functionality has been refactored into a separate, reusable `RecordModal` component that can be customized for different menu links and use cases.

## Architecture

### 1. **RecordModal Component** (`src/components/record-modal.tsx`)
- **Reusable**: Can be used across different pages
- **Configurable**: Accepts custom configuration objects
- **Type-safe**: Uses TypeScript with proper type definitions
- **Accessible**: Built with Radix UI Dialog primitives

### 2. **Modal Configurations** (`src/config/modal-configs.ts`)
- **Pre-defined configs**: Ready-to-use configurations for different sections
- **Customizable**: Easy to modify or extend for new use cases
- **Consistent**: Maintains UI/UX consistency across the application

### 3. **Updated DataTable** (`src/components/data-table.tsx`)
- **Simplified**: No longer contains modal implementation
- **Flexible**: Accepts modalConfig prop for customization
- **Clean**: Focused on table functionality only

## Available Modal Configurations

### 1. Claims Modal (`claimsModalConfig`)
```typescript
// Optimized for claims/sections management
- Title: "Add New Claim Section" / "Edit Claim Section"
- Fields: Section Header, Section Type, Status, Target Pages, Page Limit, Assigned Reviewer
- Submit: "Add Claim Section" / "Update Claim Section"
```

### 2. Categories Modal (`categoriesModalConfig`)
```typescript
// Optimized for category management
- Title: "Add New Category" / "Edit Category"
- Fields: Category Name, Category Type, Status, Target Items, Item Limit, Category Manager
- Submit: "Create Category" / "Update Category"
```

### 3. Dashboard Modal (`dashboardModalConfig`)
```typescript
// Optimized for dashboard widgets
- Title: "Add New Dashboard Widget" / "Edit Dashboard Widget"
- Fields: Widget Title, Widget Type, Status, Refresh Rate, Data Points, Data Owner
- Submit: "Add Widget" / "Update Widget"
```

### 4. Projects Modal (`projectsModalConfig`)
```typescript
// Optimized for project management
- Title: "Create New Project" / "Edit Project"
- Fields: Project Name, Project Type, Status, Target Duration, Budget Limit, Project Manager
- Submit: "Create Project" / "Update Project"
```

## Usage Examples

### Basic Usage (Claims Page)
```tsx
import { DataTable, schema } from "@/components/data-table"
import { claimsModalConfig } from "@/config/modal-configs"

<DataTable 
  data={data} 
  onAddRecord={handleAddRecord}
  onEditRecord={handleEditRecord}
  onDeleteRecord={handleDeleteRecord}
  modalConfig={claimsModalConfig}  // 👈 Custom configuration
/>
```

### Direct Modal Usage
```tsx
import { RecordModal } from "@/components/record-modal"
import { categoriesModalConfig } from "@/config/modal-configs"

<RecordModal
  isOpen={isModalOpen}
  onOpenChange={setIsModalOpen}
  editingRecord={editingRecord}
  onSubmit={handleSubmit}
  config={categoriesModalConfig}  // 👈 Custom configuration
/>
```

### Custom Configuration
```tsx
const customModalConfig: ModalConfig = {
  title: {
    add: "Add New Custom Item",
    edit: "Edit Custom Item"
  },
  description: {
    add: "Create a new custom item.",
    edit: "Update the custom item."
  },
  fields: {
    header: {
      label: "Custom Title",
      placeholder: "Enter title",
      required: true
    },
    type: {
      label: "Custom Type",
      options: [
        { value: "Type1", label: "Type 1" },
        { value: "Type2", label: "Type 2" },
      ]
    },
    // ... other fields
  },
  submitButton: {
    add: "Create Item",
    edit: "Update Item",
    loadingAdd: "Creating...",
    loadingEdit: "Updating..."
  }
}
```

## Customization Guide

### 1. **Creating New Modal Configurations**

Add to `src/config/modal-configs.ts`:

```typescript
export const yourNewModalConfig: ModalConfig = {
  title: {
    add: "Your Add Title",
    edit: "Your Edit Title"
  },
  description: {
    add: "Your add description",
    edit: "Your edit description"
  },
  fields: {
    header: {
      label: "Your Header Label",
      placeholder: "Your placeholder",
      required: true
    },
    type: {
      label: "Your Type Label",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ]
    },
    status: {
      label: "Your Status Label",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ]
    },
    target: {
      label: "Your Target Label",
      placeholder: "Your target placeholder"
    },
    limit: {
      label: "Your Limit Label",
      placeholder: "Your limit placeholder"
    },
    reviewer: {
      label: "Your Reviewer Label",
      options: [
        { value: "user1", label: "User 1" },
        { value: "user2", label: "User 2" },
      ]
    }
  },
  submitButton: {
    add: "Your Add Button",
    edit: "Your Edit Button",
    loadingAdd: "Adding...",
    loadingEdit: "Updating..."
  }
}
```

### 2. **Using in Your Page**

```tsx
import { yourNewModalConfig } from "@/config/modal-configs"

// In your component
<DataTable 
  data={data}
  modalConfig={yourNewModalConfig}
  // ... other props
/>
```

## Benefits

### ✅ **Reusability**
- One modal component serves multiple use cases
- Consistent behavior across the application
- Reduced code duplication

### ✅ **Customization**
- Each page can have its own modal configuration
- Easy to modify field labels, options, and behavior
- Flexible enough for different data structures

### ✅ **Maintainability**
- Centralized modal logic
- Configuration-driven approach
- Easy to add new modal types

### ✅ **Type Safety**
- Full TypeScript support
- Compile-time validation
- Better developer experience

### ✅ **Consistency**
- Uniform modal behavior across pages
- Consistent styling and UX
- Standardized form validation

## File Structure

```
src/
├── components/
│   ├── record-modal.tsx          # 🔥 Reusable modal component
│   └── data-table.tsx            # Updated to use RecordModal
├── config/
│   └── modal-configs.ts          # 🔥 Modal configurations
└── app/dashboard/
    ├── claims/page.tsx           # Uses claimsModalConfig
    ├── categories/page.tsx       # Uses categoriesModalConfig
    └── ...other pages
```

## Next Steps

1. **Add more configurations** for other menu items
2. **Extend field types** if needed (date pickers, file uploads, etc.)
3. **Add validation schemas** for each configuration
4. **Implement API integration** for each modal type
5. **Add unit tests** for the modal component and configurations

This architecture provides a solid foundation for scaling modal functionality across your entire application while maintaining consistency and flexibility.
