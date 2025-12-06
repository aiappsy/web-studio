import { NextRequest, NextResponse } from 'next/server'
import { safe, withValidation, logRequest, logResponse } from '@/lib/errors'
import { GenerateWebsiteSchema } from '@/lib/schemas'
import { agentRunner } from '@/agents/runner'
import { rateLimit, sanitizePrompt } from '@/lib/security'

// Rate limiting for expensive AI operations
const generateRateLimit = rateLimit({
  limit: 3, // 3 generations per 15 minutes
  windowMs: 15 * 60 * 1000,
})

export const POST = safe(async (request: NextRequest) => {
  // Apply rate limiting
  await generateRateLimit(request)

  // Validate input
  const body = await request.json()
  const { description, style, projectName, industry, targetAudience, colorScheme } = withValidation(GenerateWebsiteSchema, body)

  // Sanitize user input
  const sanitizedDescription = sanitizePrompt(description)
  const sanitizedStyle = style ? sanitizePrompt(style) : undefined

  logRequest(request, {
    operation: 'generate-website',
    projectName,
    industry,
    targetAudience,
  })

  const executionId = crypto.randomUUID()

  try {
    // Use the new agent pipeline for complete website generation
    const websiteData = await agentRunner.runWebsiteGenerationPipeline({
      description: sanitizedDescription,
      style: sanitizedStyle,
      projectName,
      industry,
      targetAudience,
      colorScheme,
    })

    const response = NextResponse.json({
      success: true,
      data: websiteData,
      executionId,
      message: 'Website generated successfully',
    })

    logResponse(response, { executionId, projectName })
    return response

  } catch (error) {
    console.error('Website generation error:', error)
    
    const response = NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      executionId,
    }, { status: 500 })

    logResponse(response, { executionId, error: error instanceof Error ? error.message : 'Unknown error' })
    return response
  }
})