import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "", type: "", budget: "", deadline: "" });
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: "", country: "", contact: "", email: "", phone: "" });
  const [documents, setDocuments] = useState([]);
  const [consortiumAgreement, setConsortiumAgreement] = useState(null);

  const addProject = () => {
    if (newProject.name && newProject.description && newProject.type && newProject.budget && newProject.deadline) {
      setProjects([...projects, newProject]);
      setNewProject({ name: "", description: "", type: "", budget: "", deadline: "" });
    }
  };

  const addPartner = () => {
    if (newPartner.name && newPartner.country && newPartner.contact && newPartner.email) {
      setPartners([...partners, newPartner]);
      setNewPartner({ name: "", country: "", contact: "", email: "", phone: "" });
    }
  };

  const uploadDocument = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments([...documents, file.name]);
    }
  };

  const uploadConsortiumAgreement = (event) => {
    const file = event.target.files[0];
    if (file) {
      setConsortiumAgreement(file.name);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("BridgePoint Project Management Report", 14, 20);
    
    doc.autoTable({
      head: [["Project Name", "Funding Program", "Budget (€)", "Deadline", "Description"]],
      body: projects.map(project => [project.name, project.type, project.budget, project.deadline, project.description])
    });
    
    doc.text("Partners", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [["Partner Name", "Country", "Contact Person", "Email", "Phone"]],
      body: partners.map(partner => [partner.name, partner.country, partner.contact, partner.email, partner.phone])
    });
    
    doc.save("BridgePoint_Project_Report.pdf");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">BridgePoint Project Management Portal</h1>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add New Project</h2>
          <Input
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <Textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <Input
            placeholder="Funding Program (e.g., Horizon, Erasmus)"
            value={newProject.type}
            onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
          />
          <Input
            placeholder="Estimated Budget (€)"
            value={newProject.budget}
            onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
          />
          <Input
            type="date"
            placeholder="Proposal Deadline"
            value={newProject.deadline}
            onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
          />
          <Button onClick={addProject}>Add Project</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add Partner</h2>
          <Input
            placeholder="Partner Name"
            value={newPartner.name}
            onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
          />
          <Input
            placeholder="Country"
            value={newPartner.country}
            onChange={(e) => setNewPartner({ ...newPartner, country: e.target.value })}
          />
          <Input
            placeholder="Contact Person"
            value={newPartner.contact}
            onChange={(e) => setNewPartner({ ...newPartner, contact: e.target.value })}
          />
          <Input
            placeholder="Email Address"
            value={newPartner.email}
            onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={newPartner.phone}
            onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
          />
          <Button onClick={addPartner}>Add Partner</Button>
        </CardContent>
      </Card>
      
      <Button onClick={generatePDF} className="bg-blue-500 text-white p-2 rounded">Generate PDF Report</Button>
    </div>
  );
}
