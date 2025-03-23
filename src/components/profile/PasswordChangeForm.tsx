
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface PasswordChangeFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'confirmPassword' && value !== formData.newPassword) {
      setError('Passwords do not match');
    } else if (id === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    console.log('Changing password');
    onSubmit();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="currentPassword" className="text-right">
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.currentPassword}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="newPassword" className="text-right">
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.newPassword}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="confirmPassword" className="text-right">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            className="col-span-3"
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
        </div>
        {error && (
          <div className="text-sm text-destructive ml-auto col-span-3">
            {error}
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!!error || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}>
          <Lock className="mr-2 h-4 w-4" /> Change Password
        </Button>
      </DialogFooter>
    </>
  );
};

export default PasswordChangeForm;
