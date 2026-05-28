import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Employee } from "@/models/Employee";
import { hashPassword } from "@/lib/auth";

const SEED_DATA = [
	{
		name: "Aditya Gupta",
		email: "aditya@schoolasium.com",
		role: "super_admin",
		department: "Engineering",
		password: "Aditya@9142",
	},
	// {
	// 	name: "Sara Johnson",
	// 	email: "sara@schoolasium.com",
	// 	role: "admin",
	// 	department: "Design",
	// 	password: "Admin@1234",
	// },
	// {
	// 	name: "Marcus Reyes",
	// 	email: "marcus@schoolasium.com",
	// 	role: "employee",
	// 	department: "Engineering",
	// 	password: "Employee@1234",
	// },
	// {
	// 	name: "Priya Devi",
	// 	email: "priya@schoolasium.com",
	// 	role: "employee",
	// 	department: "Product",
	// 	password: "Employee@1234",
	// },
	// {
	// 	name: "Tom Nguyen",
	// 	email: "tom@schoolasium.com",
	// 	role: "viewer",
	// 	department: "Marketing",
	// 	password: "Viewer@1234",
	// 	status: "disabled",
	// },
] as const;

// POST /api/admin/seed — seed initial employees (only if DB is empty)
// Protect with a SEED_SECRET env var so it can't be called in production without a key
export async function POST(request: NextRequest) {
	const secret = process.env.SEED_SECRET;
	const body = await request.json().catch(() => ({}));

	if (secret && body.secret !== secret) {
		return NextResponse.json(
			{ error: "Forbidden — invalid seed secret." },
			{ status: 403 },
		);
	}

	try {
		await connectDB();
		const count = await Employee.countDocuments();

		if (count > 0 && !body.force) {
			return NextResponse.json({
				message:
					"Database already seeded. Pass { force: true } to re-seed.",
				count,
			});
		}

		if (body.force) {
			await Employee.deleteMany({});
		}

		const results = [];
		for (const seed of SEED_DATA) {
			const passwordHash = await hashPassword(seed.password);
			const parts = seed.name.trim().split(/\s+/);
			const avatar =
				parts.length >= 2 ?
					(parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
				:	parts[0].slice(0, 2).toUpperCase();

			const emp = await Employee.create({
				name: seed.name,
				email: seed.email,
				passwordHash,
				role: seed.role,
				department: seed.department,
				status: ("status" in seed ? seed.status : "active") as
					| "active"
					| "disabled",
				avatar,
				createdBy: "system",
			});
			results.push({
				id: String(emp._id),
				email: emp.email,
				role: emp.role,
			});
		}

		return NextResponse.json({
			message: "Seed complete.",
			employees: results,
			passwords: {
				super_admin_admin: "Aditya@9142",
				employee: "Employee@1234",
				viewer: "Viewer@1234",
			},
		});
	} catch (err) {
		console.error("[POST /api/admin/seed]", err);
		return NextResponse.json(
			{ error: "Seed failed: " + String(err) },
			{ status: 500 },
		);
	}
}
