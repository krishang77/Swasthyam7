
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileEditFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '(555) 123-4567',
    bio: 'Fitness enthusiast and software developer. Love running and hiking on weekends.',
    gender: 'Male',
    birthdate: '1990-05-15',
    height: '175',
    weight: '70',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting profile data:', formData);
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Full Name
          </Label>
          <Input
            id="name"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.phone}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gender" className="text-right">
            Gender
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('gender', value)} defaultValue={formData.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="birthdate" className="text-right">
            Birthdate
          </Label>
          <Input
            id="birthdate"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.birthdate}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="height" className="text-right">
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.height}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="weight" className="text-right">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.weight}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bio" className="text-right">
            Bio
          </Label>
          <Textarea
            id="bio"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.bio}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProfileEditForm;
