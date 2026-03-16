from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class RoleEnum(str, enum.Enum):
    employee = "employee"
    admin = "admin"

class LeaveStatusEnum(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class LeaveTypeEnum(str, enum.Enum):
    sick = "sick"
    casual = "casual"
    vacation = "vacation"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    department = Column(String(100), nullable=True)
    position = Column(String(100), nullable=True)
    joining_date = Column(String(20), nullable=True)
    emergency_contact = Column(String(100), nullable=True)
    role = Column(Enum(RoleEnum), default=RoleEnum.employee)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    leaves = relationship("Leave", back_populates="employee")
    posts = relationship("Post", back_populates="author")

class Leave(Base):
    __tablename__ = "leaves"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    leave_type = Column(Enum(LeaveTypeEnum), nullable=False)
    start_date = Column(String(20), nullable=False)
    end_date = Column(String(20), nullable=False)
    reason = Column(Text, nullable=True)
    status = Column(Enum(LeaveStatusEnum), default=LeaveStatusEnum.pending)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    employee = relationship("User", back_populates="leaves")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    author = relationship("User", back_populates="posts")