
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BedIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SleepLogFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const SleepLogForm: React.FC<SleepLogFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    sleepTime: '22:00',
    wakeTime: '06:00',
    quality: 'Good',
    notes: '',
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
    console.log('Submitting sleep log:', formData);
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sleepTime" className="text-right">
            Sleep Time
          </Label>
          <Input
            id="sleepTime"
            type="time"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.sleepTime}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="wakeTime" className="text-right">
            Wake Time
          </Label>
          <Input
            id="wakeTime"
            type="time"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.wakeTime}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quality" className="text-right">
            Sleep Quality
          </Label>
          <div className="col-span-3">
            <Select onValueChange={(value) => handleSelectChange('quality', value)} defaultValue={formData.quality}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Any factors affecting your sleep"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.notes}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          <BedIcon className="mr-2 h-4 w-4" /> Log Sleep
        </Button>
      </DialogFooter>
    </>
  );
};

export default SleepLogForm;
