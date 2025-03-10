"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Download,
  File,
  FileImage,
  FileIcon as FilePdf,
  FileSpreadsheet,
  Calendar,
} from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for documents
const mockDocuments = [
  {
    id: "1",
    name: "Enrollment Form",
    type: "form",
    category: "enrollment",
    format: "pdf",
    lastUpdated: "2023-05-15",
    size: "245 KB",
    required: true,
    description: "Required form for all new enrollments",
  },
  {
    id: "2",
    name: "Medical Authorization",
    type: "form",
    category: "medical",
    format: "pdf",
    lastUpdated: "2023-06-22",
    size: "180 KB",
    required: true,
    description: "Authorization for emergency medical treatment",
  },
  {
    id: "3",
    name: "Parent Handbook",
    type: "handbook",
    category: "policies",
    format: "pdf",
    lastUpdated: "2023-04-10",
    size: "1.2 MB",
    required: false,
    description: "Comprehensive guide to daycare policies and procedures",
  },
  {
    id: "4",
    name: "Weekly Menu Template",
    type: "template",
    category: "food",
    format: "xlsx",
    lastUpdated: "2023-07-05",
    size: "78 KB",
    required: false,
    description: "Template for planning weekly meals",
  },
  {
    id: "5",
    name: "Emergency Contact Form",
    type: "form",
    category: "emergency",
    format: "pdf",
    lastUpdated: "2023-05-18",
    size: "150 KB",
    required: true,
    description: "Emergency contact information for each child",
  },
]

// Document categories
const categories = ["enrollment", "medical", "policies", "food", "emergency", "activities", "transportation", "staff"]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  const handleAddDocument = async (data: any) => {
    const newDocument = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type,
      category: data.category,
      format: data.format,
      lastUpdated: new Date().toISOString().split("T")[0],
      size: data.size || "0 KB",
      required: data.required === "true",
      description: data.description,
    }

    setDocuments([...documents, newDocument])
  }

  const handleEditDocument = async (data: any) => {
    if (!selectedDocument) return

    const updatedDocument = {
      ...selectedDocument,
      name: data.name,
      type: data.type,
      category: data.category,
      format: data.format,
      required: data.required === "true",
      description: data.description,
    }

    setDocuments(documents.map((doc) => (doc.id === selectedDocument.id ? updatedDocument : doc)))
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const filteredDocuments =
    activeCategory === "all" ? documents : documents.filter((doc) => doc.category === activeCategory)

  const getDocumentIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FilePdf className="h-8 w-8 text-red-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-8 w-8 text-blue-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const documentColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Document Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getDocumentIcon(row.original.format)}
          <div>
            <div className="font-medium">{row.getValue("name")}</div>
            <div className="text-xs text-muted-foreground">{row.original.description}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="secondary" className="capitalize">
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("lastUpdated")}</span>
        </div>
      ),
    },
    {
      accessorKey: "required",
      header: "Required",
      cell: ({ row }) => (
        <Badge variant={row.getValue("required") ? "default" : "outline"}>
          {row.getValue("required") ? "Required" : "Optional"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original

        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Download">
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedDocument(document)
                setIsEditDialogOpen(true)
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteDocument(document.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const handleRowClick = (document: any) => {
    setSelectedDocument(document)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Document
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Card className="md:w-64 flex-shrink-0">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Button
                  variant={activeCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory("all")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  All Documents
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    className="w-full justify-start capitalize"
                    onClick={() => setActiveCategory(category)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedDocument(document)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">{getDocumentIcon(document.format)}</div>
                    <h3 className="font-medium text-center mb-2">{document.name}</h3>
                    <div className="flex justify-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {document.category}
                      </Badge>
                      <Badge variant={document.required ? "default" : "outline"}>
                        {document.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
                      {document.description}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{document.format.toUpperCase()}</span>
                      <span>{document.size}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DataTable
              columns={documentColumns}
              data={filteredDocuments}
              searchColumn="name"
              onRowClick={handleRowClick}
            />
          </div>
        </div>

        {/* Add Document Dialog */}
        <DialogForm
          title="Add Document"
          description="Upload a new document or form"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddDocument}
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Document Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Document Type</Label>
                <Select name="type" defaultValue="form">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="handbook">Handbook</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="enrollment">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">File Format</Label>
                <Select name="format" defaultValue="pdf">
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="docx">Word</SelectItem>
                    <SelectItem value="jpg">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="required">Required</Label>
                <Select name="required" defaultValue="false">
                  <SelectTrigger id="required">
                    <SelectValue placeholder="Is this required?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Required</SelectItem>
                    <SelectItem value="false">Optional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <Input id="file" name="file" type="file" />
            </div>
          </div>
        </DialogForm>

        {/* Edit Document Dialog */}
        {selectedDocument && (
          <DialogForm
            title="Edit Document"
            description="Update document information"
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleEditDocument}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input id="name" name="name" defaultValue={selectedDocument.name} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select name="type" defaultValue={selectedDocument.type}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form">Form</SelectItem>
                      <SelectItem value="handbook">Handbook</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={selectedDocument.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="capitalize">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">File Format</Label>
                  <Select name="format" defaultValue={selectedDocument.format}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="docx">Word</SelectItem>
                      <SelectItem value="jpg">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="required">Required</Label>
                  <Select name="required" defaultValue={selectedDocument.required.toString()}>
                    <SelectTrigger id="required">
                      <SelectValue placeholder="Is this required?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Required</SelectItem>
                      <SelectItem value="false">Optional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={selectedDocument.description} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Replace File (optional)</Label>
                <Input id="file" name="file" type="file" />
              </div>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  )
}

