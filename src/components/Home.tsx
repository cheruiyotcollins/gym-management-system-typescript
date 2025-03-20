import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { motion } from "framer-motion";

interface Member {
  id: number;
  name: string;
  membership: string;
}

const GymManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [membership, setMembership] = useState("Basic");

  const addMember = () => {
    if (name.trim() !== "") {
      setMembers([...members, { id: Date.now(), name, membership }]);
      setName("");
      setMembership("Basic");
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4">Gym Management System</h1>
      <Card className="mb-4">
        <CardContent className="p-4 flex gap-2">
          <Input
            placeholder="Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="border rounded p-2"
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
          <Button onClick={addMember}>Add Member</Button>
        </CardContent>
      </Card>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Membership</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.membership}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </motion.div>
  );
};

export default GymManagement;
