import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import Swal from 'sweetalert2';

const ChangePassword = ({ visible, onClose, mobile }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Swal.fire("Error", "Please fill all the fields", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New passwords do not match", "error");
      return;
    }
    if (newPassword.length < 6) {
      Swal.fire("Error", "New password should be at least 6 characters long", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/seller/change-password/${mobile}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to change password');
      }

      Swal.fire("Success", "Password changed successfully", "success");
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onClose();
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to change password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Change Password"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Change Password"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <Input.Password
        name="currentPassword"
        placeholder="Current Password"
        value={form.currentPassword}
        onChange={handleInputChange}
        autoFocus
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleInputChange}
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={form.confirmPassword}
        onChange={handleInputChange}
      />
    </Modal>
  );
};

export default ChangePassword;
