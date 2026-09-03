package in.mindcraft.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain letters and spaces only")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Aadhar number is required")
    @Pattern(regexp = "^\\d{12}$", message = "Aadhar must contain exactly 12 digits")
    @Column(nullable = false, length = 12)
    private String aadhar;

    @NotBlank(message = "PAN number is required")
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]$", message = "Invalid PAN format")
    @Column(nullable = false, length = 10)
    private String pan;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Phone must contain 10 digits")
    @Column(nullable = false, length = 10)
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    @Column(nullable = false, length = 150)
    private String email;

    @NotNull(message = "Salary is required")
    @PositiveOrZero(message = "Salary cannot be negative")
    @Column(nullable = false)
    private Double salary;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 60, message = "Age cannot exceed 60")
    @Column(nullable = false)
    private Integer age;

    @NotBlank(message = "Department is required")
    @Column(nullable = false, length = 100)
    private String department;

    @NotBlank(message = "Gender is required")
    @Column(nullable = false, length = 20)
    private String gender;

    @NotNull(message = "Joining date is required")
    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

    @Column(name = "active_employee", nullable = false)
    private boolean activeEmployee = true;

    public Employee() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAadhar() { return aadhar; }
    public void setAadhar(String aadhar) { this.aadhar = aadhar; }
    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public LocalDate getJoiningDate() { return joiningDate; }
    public void setJoiningDate(LocalDate joiningDate) { this.joiningDate = joiningDate; }
    public boolean isActiveEmployee() { return activeEmployee; }
    public void setActiveEmployee(boolean activeEmployee) { this.activeEmployee = activeEmployee; }
}
